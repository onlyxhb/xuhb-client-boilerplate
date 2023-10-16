<script lang="ts" setup>
const list = ref([])
const columns1: any = [
  {
    title: '序号',
    dataIndex: 'code',
    slotName: 'code',
    width: 100
  },
  {
    title: '发票地址',
    dataIndex: 'shortName'
  },
  {
    title: '下载',
    dataIndex: 'from'
  }
]
</script>

<template>
  <a-table :columns="columns1" :data="list" style="height: 100%">
    <template #empty>
      <div class="tlc">暂无数据</div>
    </template>
    <template #code="{ record }">
      <a-typography-paragraph copyable>{{ record.code }}</a-typography-paragraph>
    </template>
  </a-table>
</template>

<style lang="less" scoped></style>
