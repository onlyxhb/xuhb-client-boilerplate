<script lang="ts" setup>
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
</script>

<template>
  <a-table :columns="columns" :data="data" :scroll="{ x: 1100 }">
    <template #empty>
      <p class="tlc">暂无数据</p>
    </template>
  </a-table>
</template>

<style lang="less" scoped></style>
