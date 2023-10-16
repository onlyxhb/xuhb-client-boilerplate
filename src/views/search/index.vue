<script lang="ts" setup>
import { getCodeList } from '@/api/code'
import { getInnerCode } from '@/utils/str'
const active: any = ref(0)
const total = ref(0)
const key1 = ref('')
const key2 = ref('')
const list = ref<any>([])
const columns1: any = [
  {
    title: '分类编码',
    dataIndex: 'code',
    slotName: 'code',
    width: 220
  },
  {
    title: '商品和服务名称',
    dataIndex: 'shortName',
    width: 150
  },
  {
    title: '描述',
    dataIndex: 'desc'
  },
  {
    title: '来源',
    dataIndex: 'from',
    width: 80
  }
]
const columns2: any = [
  {
    title: '序号',
    dataIndex: 'num'
  },
  {
    title: '商品名称',
    dataIndex: 'name'
  },
  {
    title: '分类编码',
    dataIndex: 'code'
  },
  {
    title: '大类名称',
    dataIndex: 'shortName'
  }
]
const handleSearch = async () => {
  const keyword = active.value === 0 ? key1.value : key2.value.replace(/[\r\n]/g, ',')
  console.log(key2.value, key2.value.replace(/\/n/g, ','))
  const res: any = await getCodeList({ keyword })
  const outerList: any = res.data.list || []
  const innerList: any = getInnerCode(keyword)
  list.value = [...outerList, ...innerList]
  total.value = res.data.total + innerList.length
}
</script>

<template>
  <db-container title="查询" tab-type="newline">
    <template #tabs>
      <a-tabs v-model:active-key="active" class="common-padding">
        <a-tab-pane :key="0" title="单个编码查询" />
        <a-tab-pane :key="1" title="批量编码查询" />
      </a-tabs>
    </template>
    <template #top>
      <div class="search-top" v-if="active === 0">
        <a-input-search
          v-model="key1"
          placeholder="请输入内容"
          class="mgb-10"
          @search="handleSearch"
          @press-enter="handleSearch"
        />
      </div>
      <div class="search-top" v-if="active === 1">
        <p class="mgb-10">单次最多可查询 1000 个商品，超出建议分次查询。</p>
        <a-textarea
          v-model="key2"
          placeholder="格式如下，一行一条，可以批量复制进文本框：墨盒 打印机 电脑"
          allow-clear
        />
        <div class="common-flex-between common-flex-align-center mgt-10">
          <span>商品名称之间使用换行分隔</span>
          <p>
            <span>剩余额度:</span>
            <a-typography-text type="danger" class="mgr-10">0条</a-typography-text>
            <a-button type="primary" size="small" @click="handleSearch">立即查询</a-button>
          </p>
        </div>
        <a-card :bordered="false" class="mgt-10 mgb-10">
          批量查询后可以选择导出到EXCEL或者直接导入开百旺航天UKEY开票系统
        </a-card>
      </div>
    </template>
    <a-table v-if="active === 0" :columns="columns1" :data="list" style="height: 100%">
      <template #empty>
        <div class="tlc">暂无数据</div>
      </template>
      <template #code="{ record }">
        <a-typography-paragraph copyable>{{ record.code }}</a-typography-paragraph>
      </template>
    </a-table>
    <a-table v-if="active === 1" :columns="columns2" :data="list" style="height: 100%">
      <template #empty>
        <p class="tlc">暂无数据</p>
      </template>
    </a-table>
  </db-container>
</template>

<style lang="less" scoped>
.search-top {
  padding: 10px 40px 0;
}
</style>
