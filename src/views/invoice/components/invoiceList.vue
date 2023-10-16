<script lang="ts" setup>
import { useStore } from '@/stores/invoice'
const store = useStore()
const columns: any = [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'id',
    width: 60
  },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '型号',
    align: 'center',
    dataIndex: 'type'
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'unit',
    width: 60
  },
  {
    title: '数量',
    align: 'center',
    dataIndex: 'number',
    width: 100
  },
  {
    title: '单价-不含税',
    align: 'center',
    dataIndex: 'price'
  },
  {
    title: '金额-不含税',
    align: 'center',
    dataIndex: 'total'
  },
  {
    title: '税率',
    align: 'center',
    dataIndex: 'rate',
    width: 100
  },
  {
    title: '税收分类编码',
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '零税率标识',
    align: 'center',
    dataIndex: 'zero'
  },
  {
    title: '折扣额',
    align: 'center',
    dataIndex: 'discount'
  },
  {
    title: '操作',
    align: 'center',
    fixed: 'right',
    slotName: 'operator',
    dataIndex: 'operator',
    width: 150
  }
]
const handleDelete = (index: any) => console.log(index)
const summary = () => {
  const { list, selectedKeys } = store.taxInfo || {}
  const filterList = list?.filter((item: any) => selectedKeys.includes(item.id))
  const number = filterList.reduce((sub: number, curr: any) => {
    // eslint-disable-next-line no-param-reassign
    sub = sub + curr.number
    return sub
  }, 0)
  const total = filterList.reduce((sub: number, curr: any) => {
    // eslint-disable-next-line no-param-reassign
    sub += curr.total
    return sub
  }, 0)
  return [
    {
      id: '汇总',
      name: `选择${filterList.length}行`,
      type: '',
      unit: '',
      number: `${number}个`,
      price: '',
      total: `${total}元`,
      rate: '',
      code: '',
      zero: '',
      discount: ''
    }
  ]
}
const rowSelection: any = {
  type: 'checkbox',
  showCheckedAll: true
}
</script>

<template>
  <a-table
    :columns="columns"
    :data="store.taxInfo.list"
    row-key="id"
    v-model:selected-keys="store.taxInfo.selectedKeys"
    :row-selection="rowSelection"
    :summary="summary"
    style="height: 100%"
    :scroll="{ x: 1400 }"
    :pagination="false"
  >
    <template #empty>
      <p class="tlc">开票软件里导出商品编码后导入编码</p>
    </template>
    <template #operator="{ rowIndex, record }">
      <a-space v-if="record.id !== '汇总'">
        <a-button type="primary" size="mini" status="danger" @click="handleDelete(rowIndex)">
          <icon-delete />
        </a-button>
        <a-button type="primary" size="mini" status="success" @click="handleDelete(rowIndex)">
          <icon-edit />
        </a-button>
        <a-button type="primary" size="mini" @click="handleDelete(rowIndex)">
          <icon-plus />
        </a-button>
      </a-space>
    </template>
  </a-table>
</template>

<style lang="less" scoped></style>
