<script lang="ts" setup>
import DynamicComponent from './DynamicComp.vue'

const props: any = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '添加'
  },
  width: {
    type: String,
    default: '450px'
  },
  labelWidth: {
    type: String,
    default: '120px'
  },
  cancelButtonText: {
    type: String,
    default: '取 消'
  },
  confirmButtonText: {
    type: String,
    default: '确 定'
  },
  formInitData: {
    type: Object,
    default: () => ({})
  },
  formConfig: {
    type: Array,
    required: true
  },
  autoPlaceholder: Boolean,
  mask: {
    type: Boolean,
    default: true
  },
  loadingTip: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['update:visible', 'input', 'close', 'confirm'])

const formRef = ref()
const form = ref<any>({})
const trigger = ref('')
const loading = ref(false)

// eslint-disable-next-line
const defaultChange = (val: any) => (trigger.value = val)

const formItems: any = computed(() => {
  return props.formConfig
    .filter((v: any) => !v.hidden)
    .map((v: any) => {
      if (v.type === 'select' && !v.change) {
        v.change = defaultChange
      }
      return props.autoPlaceholder ? { placeholder: v.label.replace(/:|：/, ''), ...v } : v
    })
})

const resetData = (objData = {}, load = false) => {
  loading.value = load
  form.value = { ...objData, ...props.formInitData }
  formItems.value?.forEach(({ type, options, prop }: any) => {
    if (type === 'select' && options.length && !form.value[prop]) {
      form.value[prop] = options[0].value
    }
  })

  nextTick(() => {
    formRef.value?.clearValidate()
  })
}

const defaultClose = () => {
  trigger.value = ''
  emits('update:visible', false)
  emits('input', false)
}

const close = () => {
  defaultClose()
  emits('close')
}

const validate = (field?: any) => {
  return field ? formRef.value.validateField(field) : formRef.value.validate()
}
const onOk = () => {
  validate().then(() => {
    emits('confirm', form.value)
    defaultClose()
  })
}

const handleWatch = (v: any) => v && resetData()

watch(() => props.visible, handleWatch)

defineExpose({ resetData })
</script>

<template>
  <a-modal :title="title" :visible="visible" :width="width" @update:visible="close" :mask="mask">
    <slot name="tips"></slot>
    <a-spin :loading="loading" :tip="loadingTip" style="width: 100%">
      <a-form :model="form" ref="formRef" :label-width="labelWidth">
        <template v-for="item in formItems" :key="item.field">
          <a-form-item
            v-if="!item.show || item.show(form)"
            :name="item.field"
            :label="item.label"
            :labelWidth="item.labelWidth"
            :rules="item.rules"
          >
            <dynamic-component
              :cmp="item"
              v-model="form[item.field]"
              @change="(value: any) => item.change && item.change(value, form)"
            ></dynamic-component>
          </a-form-item>
        </template>
        <slot :form="form"></slot>
        <span style="display: none">{{ trigger }}</span>
      </a-form>
    </a-spin>
    <template #footer>
      <slot name="footer">
        <a-space>
          <a-button @click="close">{{ cancelButtonText }}</a-button>
          <a-button type="primary" @click="onOk">{{ confirmButtonText }}</a-button>
        </a-space>
      </slot>
    </template>
  </a-modal>
</template>
