<script lang="ts" setup>
import { requireRule2 } from '@/utils/validate'
import { recognizeFile } from '@/utils/file'
import { getCompanyInfo } from '@/utils/str'

defineProps({
  formInitData: Object,
  visible: {
    type: Boolean,
    default: false
  },
  mask: {
    type: Boolean,
    default: true
  }
})
const dialogRef = ref()
const emits = defineEmits(['update:visible', 'confirm'])

const handleRecognize = () => {
  const target: any = document.querySelector('.global-file-select-hidden') || {}
  target.onchange = async (e: any) => {
    try {
      dialogRef.value.resetData({}, true)
      const files = e.target.files || []
      const str: any = await recognizeFile(files[0])
      const res = await getCompanyInfo(str)
      dialogRef.value.resetData(res, false)
    } catch (error: any) {
      window.Message.error(error.message || '识别失败')
      dialogRef.value.resetData({}, false)
    }
  }
  target.click()
}

const formConfig = ref([
  {
    label: '单位名称',
    field: 'cname',
    type: 'input',
    rules: requireRule2,
    slotAppend: '识图',
    appendClick: () => handleRecognize(),
    props: { style: 'width:95%;', maxLength: 20, placeholder: '请输入单位名称' }
  },
  {
    label: '识别号',
    field: 'sbh',
    type: 'input',
    rules: requireRule2,
    props: { style: 'width:95%;', maxLength: 30, placeholder: '请输入识别号' }
  },
  {
    label: '地址电话',
    field: 'address',
    type: 'textarea',
    rules: requireRule2,
    props: { style: 'width:95%;', placeholder: '请输入地址电话' }
  },
  {
    label: '开户行',
    field: 'bank',
    type: 'textarea',
    rules: requireRule2,
    props: { style: 'width:95%;', maxLength: 50, placeholder: '请输入开户行' }
  }
])

const visibleChange = (val: boolean) => {
  emits('update:visible', val)
}

const handleConfirm = (info: any) => {
  emits('confirm', info)
  visibleChange(false)
}
</script>

<template>
  <form-dialog
    ref="dialogRef"
    title="单位配置"
    confirmButtonText="保存"
    width="500px"
    label-width="90px"
    :visible="visible"
    :form-config="formConfig"
    :form-init-data="formInitData"
    :mask="mask"
    @confirm="handleConfirm"
    @close="visibleChange(false)"
  />
</template>
<style lang="less">
.skin-share-dialog-upload {
  width: 260px;
  border-radius: 2px;
  border: 1px solid #eee;
  .img-container {
    border: none !important;
    margin-right: 4px !important;
  }
  button {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    border: none;
    color: #aaa;
    padding: 0;
    height: 40px;
    line-height: 20px;
    margin-top: 0 !important;
  }
  button:hover,
  button:active,
  button:focus {
    background: #fff !important;
    color: #aaa !important;
  }
  button::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '格式：jpg/png/jpeg';
  }
  button::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '尺寸：250px * 250px';
  }
  button span {
    display: none !important;
  }
  a {
    margin-left: 0 !important;
  }
}
</style>
