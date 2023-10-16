<script lang="ts" setup>
const columns = [
  {
    title: '商品名称',
    dataIndex: 'name'
  },
  {
    title: '税收分类编码',
    dataIndex: 'salary'
  },
  {
    title: '税收分类编码名称',
    dataIndex: 'address'
  },
  {
    title: '税率',
    dataIndex: 'email'
  },
  {
    title: '操作',
    slotName: 'operator',
    dataIndex: 'operator'
  }
]
const data = ref([
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
  }
])
const handleDelete = (index: number) => console.log(index)
const handleSelect = () => console.log(5)
</script>

<template>
  <db-container title="编码">
    <template #top>
      <a-space class="common-flex-between common-flex-align-center common-padding" wrap>
        <span>自动赋码时:</span>
        <a-checkbox value="1">使用导入的编码</a-checkbox>
        <a-checkbox value="2">使用内置的编码</a-checkbox>
        <a-checkbox value="3">使用接口获取编码</a-checkbox>
        <span>优先使用税控盘的编码赋码(需要导入编码)，税控盘没有的使用接口获取。</span>
        <a-input placeholder="输入关键字过滤商品名称" class="w-200" />
        <a-button type="primary" size="mini" status="success">复制全部编码导出到本地</a-button>
        <a-button type="primary" size="mini" status="danger">清除导入的编码</a-button>
        <a-dropdown @select="handleSelect">
          <a-button>
            导出编码
            <icon-down />
          </a-button>
          <template #content>
            <a-doption>航天模式导出</a-doption>
            <a-doption>百旺UK格式导出</a-doption>
          </template>
        </a-dropdown>
      </a-space>
    </template>
    <a-table :columns="columns" :data="data" :scroll="{ x: 900 }" style="height: 100%">
      <template #empty>
        <p class="tlc">开票软件里导出商品编码后导入编码</p>
      </template>
      <template #operator="{ rowIndex }">
        <a-button type="primary" size="mini" status="danger" @click="handleDelete(rowIndex)">
          <icon-delete />
          <span>删除</span>
        </a-button>
      </template>
    </a-table>
  </db-container>
</template>

<style lang="less" scoped></style>
