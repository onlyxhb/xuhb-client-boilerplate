<script lang="ts" setup>
import dayjs from 'dayjs'
const active = ref(0)
const columns: any = [
  {
    title: '账号',
    align: 'center',
    dataIndex: 'username',
    ellipsis: true,
    tooltip: true,
    width: 100
  },
  {
    title: '注册时间',
    align: 'center',
    dataIndex: 'createTime'
  },
  {
    title: '开通时间',
    align: 'center',
    dataIndex: 'openTime'
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'phone'
  },
  {
    title: '来源',
    align: 'center',
    dataIndex: 'origin',
    ellipsis: true,
    tooltip: true,
    width: 100
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status'
  },
  {
    title: '到期时间',
    align: 'center',
    dataIndex: 'endTime'
  }
]
const data = ref([
  {
    key: '1',
    username: '随波逐流',
    createTime: 1656362338958,
    openTime: 1666362338958,
    phone: 13456789123,
    origin: '随心所欲',
    status: '1',
    endTime: 1686362338958
  }
])
const list = computed(() => {
  return data.value.map((item: any) => ({
    ...item,
    createTime: dayjs(item.createTime).format('YYYY-MM-DD hh:mm:ss'),
    openTime: dayjs(item.openTime).format('YYYY-MM-DD hh:mm:ss'),
    endTime: dayjs(item.endTime).format('YYYY-MM-DD hh:mm:ss'),
    status: ['已禁用', '启用中'][item.status]
  }))
})
</script>

<template>
  <a-tabs v-model:active-key="active">
    <a-tab-pane :key="0" title="推广信息" />
    <a-tab-pane :key="1" title="我的推广" />
  </a-tabs>
  <template v-if="active === 0">
    <a-typography-paragraph type="danger" class="mgb-10">
      即日起购买软件的用户推广一个有效客户，将能得到他成交额的10%（或者赠送对应金额的软件使用时长），上不封顶，详情联系客服。
    </a-typography-paragraph>
    <a-typography-paragraph type="danger" class="mgb-10">
      若您需要代理OEM(软件界面没有我们任何信息)也可以联系我们，代理政策丰厚。
    </a-typography-paragraph>
    <a-typography-paragraph type="danger" class="mgb-10">QQ：455586546，电话微信:13635715047。</a-typography-paragraph>
    <a-alert :show-icon="false" type="error">
      <div class="common-flex">
        <a-typography-paragraph>你的推广专属注册链接：</a-typography-paragraph>
        <a-typography-paragraph copyable>https://zhushou.huasivip.com/#/login?f=onlystar</a-typography-paragraph>
      </div>
      <div class="common-flex">
        <a-typography-paragraph>素材：</a-typography-paragraph>
        <img class="spread-info-img" src="@/assets/images/sucai.jpg" />
        <a-button type="outline" size="small">下载素材</a-button>
      </div>
      <div class="common-flex">
        <a-typography-paragraph>文案：</a-typography-paragraph>
        <a-typography-paragraph class="flex1" copyable>
          推荐一款好用的清单助手软件，支持航信，百旺，Ukey。支持多清单和多购货方导入。支持自动赋码，自动拆分。支持纸质发票和电子发票，是一款全能的开票软件。
        </a-typography-paragraph>
      </div>
    </a-alert>
  </template>
  <a-table v-if="active === 1" :columns="columns" :data="list" :scroll="{ x: 1100 }">
    <template #empty>
      <p class="tlc">暂无数据</p>
    </template>
  </a-table>
</template>

<style lang="less" scoped>
.spread-info-img {
  width: 220px;
  height: 220px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
