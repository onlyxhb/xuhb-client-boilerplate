<script lang="ts" setup>
import { createWorker } from 'tesseract.js'
defineProps({ btnText: String })
const emits = defineEmits(['change'])
const loading = ref(false)
const worker = ref<any>()
const handleImport = async (fileList: any, fileItem: any) => {
  try {
    if (!/\.(jpg|png|jpeg)$/.test(fileItem.name.toLowerCase())) {
      window.Message.error('上传格式不正确，请上传jpg/png/jepg格式的图片')
      return false
    }
    if (loading.value) {
      return
    }
    loading.value = true
    if (!worker.value) {
      const work = createWorker({
        workerPath: new URL('../assets/tesseract/worker.min.js', import.meta.url).href,
        langPath: new URL('../assets/tesseract/', import.meta.url).href,
        corePath: new URL('../assets/tesseract/tesseract-core.wasm.js', import.meta.url).href,
        logger: (m: any) => console.log(m)
      })
      await work.load()
      await work.loadLanguage('chi_sim')
      await work.initialize('chi_sim', 1)
      // eslint-disable-next-line
      await work.setParameters({ tessedit_pageseg_mode: '6' as any })
      worker.value = work
    }
    const { data } = await worker.value.recognize(fileItem.file)
    emits('change', data?.text)
  } catch (error) {
    window.Message.error('识别失败，请上传图片后重试...')
  } finally {
    loading.value = false
  }
}
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
