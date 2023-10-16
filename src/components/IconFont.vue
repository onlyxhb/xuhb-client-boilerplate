<script lang="ts" setup>
import { Icon } from '@arco-design/web-vue'

const iconUrl = new URL('../assets/fonts/ali-cdn-font.js', import.meta.url).href
const IconFont = Icon.addFromIconFontCn({ src: iconUrl })

defineProps({
  type: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 20
  }
})
</script>

<template>
  <icon-font :type="type" :size="size" />
</template>

<style lang="less" scoped></style>
