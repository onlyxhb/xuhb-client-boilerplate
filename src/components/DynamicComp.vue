<script lang="ts" setup>
import { Button, Input, Tag, Textarea, Select } from '@arco-design/web-vue'
import { DatePicker, Switch, RadioGroup, CheckboxGroup } from '@arco-design/web-vue'
import { toCamel } from '@/utils/str'
const CMP_MAPS: any = {
  button: Button,
  textButton: 'a',
  input: Input,
  textarea: Textarea,
  select: Select,
  daterange: DatePicker,
  date: DatePicker,
  switch: Switch,
  radioGroup: RadioGroup,
  checkboxGroup: RadioGroup,
  checkGroup: CheckboxGroup,
  tag: Tag
}
const props: any = defineProps({
  cmp: {
    type: Object,
    require: true
  },
  value: {
    type: [Number, String, Array, Boolean]
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['input', 'change', 'click'])
const plainCmp = computed(() => {
  return ['text', 'span', 'div', 'a', 'p', 'tag', 'button', 'textButton'].includes(props.cmp?.type)
})
const cmpType = computed(() => {
  const { type } = props.cmp || {}
  const camelType = toCamel(type)
  return CMP_MAPS[camelType] || type
})
// 处理表单组件的基本设置
const cmpConfig = computed(() => {
  const cmp: any = props.cmp
  if (cmp.props) return cmp
  // eslint-disable-next-line
  const { type, label, field, typeFn, handleClick, handleChange, formatter, options, rules, ...rest } = cmp
  switch (type) {
    case 'input':
      cmp.props = { placeholder: `请输入${label}`, ...rest }
      break
    case 'textarea':
      cmp.props = { placeholder: `请输入${label}`, showWordLimit: true, ...rest }
      break
    case 'radio-group':
      cmp.optionType = 'a-radio'
      cmp.props = {
        labelKey: 'label',
        textKey: 'text',
        ...rest
      }
      break
    case 'check-group':
      cmp.optionType = 'a-checkbox'
      cmp.props = {
        labelKey: 'label',
        textKey: 'text',
        ...rest
      }
      break
    case 'select':
    case 'tag-select':
      // eslint-disable-next-line
      const { labelKey = 'label', valueKey = 'value', ...resting } = rest || {}
      cmp.optionType = 'a-option'
      cmp.props = resting
      cmp.textKey = labelKey
      cmp.labelKey = labelKey
      cmp.valueKey = valueKey
      break
    case 'daterange':
      cmp.props = {
        type: 'daterange',
        valueFormat: 'yyyy-MM-dd',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        ...props
      }
      break
    default:
      cmp.props = props
  }
  return cmp
})
const handleInput = (val: any) => emits('input', val)
const handleChange = (val: any) => emits('change', val)
const handleClick = (val: any) => emits('click', val)
</script>

<template>
  <img v-if="cmpType === 'img'" :src="value" v-bind="cmpConfig.props" />
  <component
    v-else-if="plainCmp"
    :is="cmpType"
    :type="cmpConfig.typeFn && cmpConfig.typeFn(value)"
    v-bind="cmpConfig.props"
    @click="handleClick"
  >
    {{ cmpConfig.formatter ? cmpConfig.formatter(value) : value }}
  </component>
  <component
    v-else
    :is="cmpType"
    :value="value"
    :disabled="disabled"
    :typeFn="cmpConfig.typeFn"
    v-bind="cmpConfig.props"
    @input="handleInput"
    @change="handleChange"
  >
    <template v-if="cmpConfig.slotAppend" #append>
      {{ cmpConfig.slotAppend }}
      <span v-if="cmpConfig.appendClick" @click="cmpConfig.appendClick" class="dynamic-comp-append-click" />
    </template>
    <template v-if="cmpConfig.slotPrepend" #prepend>{{ cmpConfig.slotPrepend }}</template>
    <template v-if="cmpConfig.slotSuffix" #suffix><i :class="cmpConfig.slotSuffix" /></template>
    <template v-if="cmpConfig.slotPrefix" #prefix><i :class="cmpConfig.slotPrefix" /></template>
    <component
      v-for="opt in cmpConfig.options"
      :is="cmpConfig.optionType"
      v-bind="opt.props"
      :disabled="opt.disabled"
      :key="opt[cmpConfig.valueKey]"
      :label="opt[cmpConfig.labelKey]"
      :value="opt[cmpConfig.valueKey]"
    >
      {{ opt[cmpConfig.textKey] }}
    </component>
  </component>
</template>

<style>
.arco-input-append {
  position: relative;
}

.dynamic-comp-append-click {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
