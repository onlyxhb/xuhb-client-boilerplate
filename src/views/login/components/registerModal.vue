<script lang="ts" setup>
import { doRegister } from '@/api/user'
defineProps({ title: String, show: Boolean })
const emit = defineEmits(['close', 'confirm', 'update:show'])
const formRef = ref()
const form = ref({
  username: '',
  phone: '',
  password: '',
  password2: ''
})
const rules = ref({
  username: [
    { required: true, message: '账号不能为空' },
    { minLength: 5, message: '  长度至少5位' }
  ],
  phone: [
    { required: true, message: '手机号不能为空' },
    { match: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号' }
  ],
  password: [
    { required: true, message: '密码不能为空' },
    { minLength: 6, message: '  长度至少6位' }
  ],
  password2: [
    { required: true, message: '密码不能为空' },
    { minLength: 6, message: '  长度至少6位' }
  ]
})
const handleCancel = () => {
  formRef.value.clearValidate()
  formRef.value.resetFields()
  emit('update:show', false)
  emit('close')
}
const handleValidate = (key: any) => formRef.value.validateField(key)
const handleSubmit = async ({ values, errors }: any) => {
  if (errors) {
    window.Message.error('请正确填写后注册')
    return
  }
  const { username, password, phone } = values || {}
  await doRegister({ username, password, phone })
  window.Message.success('注册成功')
  handleCancel()
}
</script>

<template>
  <a-modal :visible="show" draggable :title="title" :footer="false" @cancel="handleCancel">
    <a-form ref="formRef" :model="form" :rules="rules" @submit="handleSubmit">
      <a-typography-title :heading="6" type="danger" class="tlc mgb-20">
        账号支持中文,字母和数字,注册后请牢记。
      </a-typography-title>
      <a-form-item field="username" label="账号">
        <a-input
          v-model="form.username"
          placeholder="支持中文数字字母,长度至少5位"
          @input="handleValidate('username')"
        />
      </a-form-item>
      <a-form-item field="phone" label="手机">
        <a-input v-model="form.phone" placeholder="输入正确手机便于找回密码" @input="handleValidate('phone')" />
      </a-form-item>
      <a-form-item field="password" label="输入密码">
        <a-input-password v-model="form.password" placeholder="长度至少6位" @input="handleValidate('password')" />
      </a-form-item>
      <a-form-item field="password2" label="确认密码">
        <a-input-password v-model="form.password2" placeholder="长度至少6位" @input="handleValidate('password2')" />
      </a-form-item>
      <a-button html-type="submit" type="primary" class="mgt-20" long>注册</a-button>
    </a-form>
  </a-modal>
</template>
