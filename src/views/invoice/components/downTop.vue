<script lang="ts" setup>
import { getCodeList } from '@/api/code'
const list = ref([])
const total = ref(0)
const key = ref('')
const handleSearch = async () => {
  const res: any = await getCodeList({ keyword: key.value })
  list.value = res.data.list || []
  total.value = res.data.total || 0
}
</script>

<template>
  <div class="common-padding">
    <a-input-search v-model="key" placeholder="请输入内容" @search="handleSearch" @press-enter="handleSearch" />
  </div>
</template>

<style lang="less" scoped></style>
