<script lang="ts" setup>
import { getObjProperty } from '@/utils/str'

const slots = useSlots()
const props = defineProps({
  requestFn: {
    type: Function
  },
  handleRawData: {
    type: Function
  },
  requestConfig: {
    type: Object,
    default: () => ({})
  },
  autoRequest: {
    type: Boolean,
    default: true
  },
  formData: {
    type: Object,
    default: () => {}
  },
  formateRequestData: {
    type: Function,
    default: (form: any) => form
  },
  formConfig: {
    type: Array,
    default: () => []
  },
  pageProps: {
    type: Object,
    default: () => ({ pageNo: 'pageNo', pageSize: 'pageSize', total: 'totalCount', list: 'list' })
  },
  opaProps: {
    type: Object,
    default: () => ({ title: '操作', align: 'center', slotName: 'opa', dataIndex: 'opa' })
  },
  columns: {
    type: Array,
    required: true
  },
  tableProps: {
    type: Object,
    default: () => ({})
  }
})
const emits = defineEmits(['onRequestComplete'])

const loading = ref<boolean>(false)
const params = ref<any>({})
const list = ref<any>([])
const pagination = ref<any>({ current: 1, pageSize: 10, total: 100 })

const validateFn = () => {
  return Promise.resolve(true)
}

// 处理分页信息
const handlePageInfo = (data: any, otherInfo = {}, formData = params.value) => {
  const { pageNo, pageSize, total, offset } = props.pageProps || {}
  let pageInfo = data.params || data.pagination
  if (!pageInfo) {
    pageInfo = { ...data }
  }
  const current = offset ? formData[pageNo] + 1 : formData[pageNo]
  const totalVal = getObjProperty(pageInfo, total) || getObjProperty(data, total) || getObjProperty(otherInfo, total)

  pagination.value.current = current
  pagination.value.pageSize = formData[pageSize]
  pagination.value.total = totalVal
}

const handleResponseData = (res: any, formData: any) => {
  if (!res) return
  props.handleRawData && props.handleRawData(res)
  const data = res.data || res
  list.value = getObjProperty(data, props.pageProps.list) || (Array.isArray(data) ? data : [])
  handlePageInfo(data, res, formData)
  emits('onRequestComplete', list.value, res)
}

// 处理日期范围
const formatDateRange = ({ key, keyMapper, isNeedHandle = true }: any, val: any) => {
  if (!isNeedHandle) return
  const [start, end] = val || ['', '']
  if (!keyMapper) {
    params.value[`${key}StartTime`] = start
    params.value[`${key}EndTime`] = end
  } else {
    params.value[keyMapper[0]] = start
    params.value[keyMapper[1]] = end
  }
}

const formatFormData = (pageNo: number) => {
  const { pageNo: pageNoKey, pageSize: pageSizeKey, offset } = props.pageProps
  if (pageNo) {
    params.value[pageNoKey] = offset ? pageNo - 1 : pageNo
  }

  props.formConfig.forEach((v: any) => v.type === 'daterange' && formatDateRange(v, params.value[v.prop]))
  const formData = props.formData || {}
  const pageSize = params.value[pageSizeKey] || formData[pageSizeKey] || 10

  return { ...params.value, ...formData, [pageSizeKey]: pageSize }
}

const getList = async (pageNo = 1) => {
  // 无请求接口
  if (!props.requestFn) return
  const valid = await validateFn()
  if (!valid) return

  loading.value = true
  const formData = props.formateRequestData(formatFormData(pageNo))

  props
    .requestFn(formData, props.requestConfig || {})
    .then((res: any) => handleResponseData(res, formData))
    .finally(() => {
      loading.value = false
    })
}

// 表格的分页参数
const paginationProps = computed(() => {
  return {
    ...pagination.value,
    onChange: (current: number) => getList(current)
  }
})

// 表格的虚拟列表
const virtualListProps: any = computed(() => {
  if (!list.value.length) return null
  const h = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight
  return { height: h * 0.6 }
})

// 表格的列表
const columnList: any = computed(() => {
  if (slots.opa) {
    return [...props.columns, props.opaProps]
  }
  return [...props.columns]
})

onMounted(() => {
  if (props.autoRequest) {
    getList(1)
  }
})

defineExpose({ getList })
</script>

<template>
  <slot name="form" :list="list" />
  <a-table
    class="db-table"
    v-bind="tableProps"
    :columns="columnList"
    :data="list"
    :loading="loading"
    :pagination="paginationProps"
    :virtual-list-props="virtualListProps"
  >
    <template
      v-for="(item, key, index) in slots"
      :key="index"
      v-slot:[String(key)]="{ column, record, rowIndex, expanded }"
    >
      <slot
        v-if="!['form'].includes(String(key))"
        :name="key"
        :column="column"
        :record="record"
        :rowIndex="rowIndex"
        :expanded="expanded"
      />
    </template>
    <template v-if="!slots.empty" #empty>
      <a-empty v-if="!loading" />
      <div v-else class="db-table-empty" />
    </template>
  </a-table>
</template>

<style lang="less" scoped>
.db-table-empty {
  height: 98px;
}
</style>
