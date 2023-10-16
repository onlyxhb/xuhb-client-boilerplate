<template>
  <a-config-provider :locale="zhCN">
    <a-layout class="invoice-layout">
      <db-side-bar v-if="showSideBar" />
      <a-layout-content class="invoice-layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<script lang="ts" setup>
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
const route = useRoute()
const showSideBar = ref(true)
const handleWatch = () => {
  const hash = window.location.hash || ''
  showSideBar.value = ['login'].every((key: string) => hash.indexOf(key) === -1)
}
watch(() => route, handleWatch, { deep: true, immediate: true })
</script>

<style lang="less" scoped>
.invoice-layout {
  width: 100%;
  height: 100%;
  background-color: var(--color-fill-1);
  &-content {
    position: relative;
  }
}
</style>
