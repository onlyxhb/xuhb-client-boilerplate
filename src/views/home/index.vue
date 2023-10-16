<script lang="ts" setup>
import { useStore } from '@/stores/invoice'
const store = useStore()
onMounted(store.requestData)
</script>

<template>
  <db-container title="首页"></db-container>
</template>

<style lang="less" scoped></style>
