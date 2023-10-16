<script lang="ts" setup>
defineProps({ btnText: String })
// const emits = defineEmits(['change'])
const loading = ref(false)
// const worker = ref<any>()
const handleImport = async () => {}
</script>

<template>
  <a-upload :show-file-list="false" :auto-upload="false" @change="handleImport">
    <template #upload-button>
      <a-button type="primary" size="mini" status="danger">
        <template #icon>
          <icon-loading v-if="loading" />
          <icon-idcard v-else />
        </template>
        <span>{{ btnText || '识图' }}</span>
      </a-button>
    </template>
  </a-upload>
</template>

<style lang="scss" scoped></style>
