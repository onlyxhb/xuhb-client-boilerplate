<script lang="ts" setup>
import BaseInfo from './components/baseInfo.vue'
import SafeInfo from './components/safeInfo.vue'
import SpreadInfo from './components/spreadInfo.vue'
import SystemLog from './components/systemLog.vue'
import ReleaseNote from './components/releaseNote.vue'
const active = ref(0)
</script>

<template>
  <db-container title="用户">
    <template v-slot:tabs>
      <a-tabs v-model:active-key="active" type="rounded">
        <a-tab-pane :key="0" title="基础信息" />
        <a-tab-pane :key="1" title="安全设置" />
        <a-tab-pane :key="2" title="推广有礼" />
        <a-tab-pane :key="3" title="系统日志" />
        <a-tab-pane :key="4" title="更新日志" />
      </a-tabs>
    </template>
    <template #actions>
      <a-button v-if="active === 4" type="primary" size="mini">
        <icon-sync />
        <span>检查更新</span>
      </a-button>
    </template>
    <base-info v-if="active === 0" />
    <safe-info v-if="active === 1" />
    <spread-info v-if="active === 2" />
    <system-log v-if="active === 3" />
    <release-note v-if="active === 4" />
  </db-container>
</template>

<style scoped lang="less"></style>
