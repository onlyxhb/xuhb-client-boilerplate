<script lang="ts" setup>
import { useConfig } from '@/hooks/config'

import { USER_TOKEN_KEY } from '@/constant/code'
import { doLogin, loginWithDing } from '@/api/user'
import RegisterModal from './components/registerModal.vue'
import UpdateModal from './components/updateModal.vue'

const { config } = useConfig()
const ROOT = ref(import.meta.env.VITE_ROOT || process.env.VITE_ROOT || '')
const timestamp = ref(Date.now())
const appId = 'dingoappehvb6t1yyu7zwk'
const route = useRoute()
const router = useRouter()
const showRegister = ref(false)
const showUpdate = ref(false)
const formRef = ref()
const form = ref({
  username: '',
  password: '',
  code: '',
  isSave: false,
  isMotor: false
})
const rules = ref({
  username: [{ required: true, message: '账号不能为空,点击右边免费注册就能试用。' }],
  password: [{ required: true, message: '输入密码' }],
  code: [{ required: true, message: '请输入验证码' }]
})
onMounted(async () => {
  try {
    const res = JSON.parse(localStorage.getItem('invoice_login_params') as string)
    form.value = { ...res }
    const httpUrl = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appId}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=`
    window.DDLogin({
      id: 'dingLogin',
      goto: encodeURIComponent(httpUrl + encodeURIComponent(window.location.href)),
      style: 'border:none;background-color:#fff;',
      width: '240', // 二维码的宽度
      height: '310' // 二维码的高度
    })
    // 获取到扫码结果，并且跳转获取临时登录码
    const handleMessage = async (event: any) => {
      if (event.origin === 'https://login.dingtalk.com') {
        window.location.href = httpUrl + encodeURIComponent(window.location.href) + `&loginTmpCode=${event.data}`
      }
    }
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('message', handleMessage, false)
    }
    // 如果链接上带有code则直接钉钉登录
    if (route.query?.code) {
      const { data }: any = await loginWithDing({ code: route.query?.code })
      localStorage.setItem(USER_TOKEN_KEY, data?.token)
      router.replace('/')
    }
  } catch (error) {
    console.log(520, error)
  }
})
const handleSubmit = async ({ values, errors }: any) => {
  if (errors) {
    window.Message.error('请正确填写后登陆')
    return
  }
  localStorage.removeItem('invoice_login_params')
  if (values.isSave) {
    localStorage.setItem('invoice_login_params', JSON.stringify(values))
  }
  try {
    const { data }: any = await doLogin({
      username: values.username,
      password: values.password,
      code: values.code
    })
    localStorage.setItem(USER_TOKEN_KEY, data?.token)
    router.replace('/')
  } catch (error) {
    timestamp.value = Date.now()
    console.log(520, error)
  }
}
const handleValidate = (key: any) => formRef.value.validateField(key)
</script>

<template>
  <div class="login-page">
    <a-carousel :default-current="3" auto-play show-arrow="never" indicator-type="never" class="login-carousel">
      <a-carousel-item>
        <img src="@/assets/images/login-bg1.jpg" />
      </a-carousel-item>
      <a-carousel-item>
        <img src="@/assets/images/login-bg2.jpg" />
      </a-carousel-item>
      <a-carousel-item>
        <img src="@/assets/images/login-bg3.jpg" />
      </a-carousel-item>
    </a-carousel>
    <div class="login-container">
      <div class="login-desktop">
        <img src="@/assets/images/login-desktop.png" />
        <p class="login-title">{{ config.title }}</p>
        <p class="login-subtitle">{{ config.description }}</p>
      </div>
      <a-tabs default-active-key="2" class="login-body">
        <a-tab-pane key="1" title="账号密码登陆">
          <a-form
            ref="formRef"
            class="login-form"
            :model="form"
            :rules="rules"
            size="small"
            :label-col-props="{ span: 0, offset: 0 }"
            :wrapper-col-props="{ span: 24, offset: 0 }"
            @submit="handleSubmit"
          >
            <a-form-item field="username">
              <a-input
                v-model="form.username"
                placeholder="首次使用点击右边免费注册"
                @input="handleValidate('username')"
              >
                <template #prefix><icon-user /></template>
              </a-input>
            </a-form-item>
            <a-form-item field="password">
              <a-input-password v-model="form.password" placeholder="输入密码" @input="handleValidate('password')">
                <template #prefix><icon-lock /></template>
              </a-input-password>
            </a-form-item>
            <a-form-item field="code">
              <a-input v-model="form.code" placeholder="验证码" @input="handleValidate('code')">
                <template #prefix><icon-image /></template>
              </a-input>
              <img
                class="login-form-code"
                :src="`${ROOT}/system/user/captcha?r=${timestamp}`"
                @click="() => (timestamp = Date.now())"
              />
            </a-form-item>
            <div class="common-flex-between mgb-10">
              <a-checkbox v-model="form.isSave" tabindex="-1">保存账号密码</a-checkbox>
              <db-switch v-model="form.isMotor" inactive-text="专票普票和电票" active-text="机动车票" />
            </div>
            <a-form-item class="mgb-0">
              <a-button html-type="submit" type="primary" class="login-btn" long>登陆</a-button>
            </a-form-item>
            <div class="common-flex-between">
              <a-button type="text" tabindex="-1" @click="showRegister = true">免费注册</a-button>
              <a-button type="text" tabindex="-1" @click="showUpdate = true">修改密码</a-button>
            </div>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" title="钉钉扫码登陆">
          <div class="login-code">
            <p class="login-code-title">欢迎使用{{ config.title }}</p>
            <div id="dingLogin" />
            <span class="login-code-tip">由国金公司提供支持</span>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <span class="login-comet" />
  </div>
  <register-modal v-model:show="showRegister" title="注册账号" />
  <update-modal v-model:show="showUpdate" title="修改密码" />
</template>

<style lang="less" scoped>
@keyframes cometAnim {
  0% {
    transform: rotate(-45deg) translateX(0);
    opacity: 0.3;
  }
  10% {
    opacity: 1;
  }
  20% {
    transform: rotate(-45deg) translateX(-100vw);
    opacity: 0;
  }
  100% {
    transform: rotate(-45deg) translateX(-100vw);
    opacity: 0;
  }
}
.login-page {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #978a8a;
  -webkit-app-region: drag;
  .login-carousel {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .login-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 30px;
    align-items: center;
    justify-content: center;
  }
  .login-desktop {
    margin-right: 30px;
    img {
      width: 50vw;
      height: auto;
    }
    .login-title {
      color: #fff;
      font-weight: 700;
      font-size: 26px;
      line-height: 60px;
      text-align: center;
    }
    .login-subtitle {
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      text-align: center;
    }
  }
  .login-body {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 400px;
    -webkit-app-region: no-drag;
    overflow: hidden;
    background: #fff;
    border-radius: 20px;
    transform: translateY(-10%);
    :deep(.arco-tabs-nav) {
      .arco-tabs-nav-tab-list {
        display: flex;
        flex: 1;
        align-items: center;
      }
      .arco-tabs-tab {
        flex: 1;
        margin: 0;
        padding: 16px 0;
        display: flex;
        background: #f5f5f6;
        font-size: 18px;
        font-weight: bold;
        color: rgba(37, 38, 43, 0.36);
        justify-content: center;
      }
      .arco-tabs-tab.arco-tabs-tab-active {
        background-color: #fff;
        color: #25262b;
      }
      &::before {
        background: none;
      }
      .arco-tabs-nav-ink {
        display: none;
      }
    }
    :deep(.arco-tabs-content) {
      padding-top: 0;
      flex: 1;
      .arco-tabs-content-list,
      .arco-tabs-pane {
        height: 100%;
      }
    }
  }
  .login-code {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    &-title {
      position: absolute;
      top: 10px;
      width: 100%;
      margin: 0;
      color: var(--color-text-1);
      font-weight: 700;
      font-size: 18px;
      text-align: center;
    }
    &-tip {
      position: absolute;
      bottom: 10px;
      width: 100%;
      color: rgba(37, 38, 43, 0.36);
      font-size: 12px;
      text-align: center;
    }
  }
  .login-form {
    width: 100%;
    padding: 14px 24px 0;
    .arco-form-item {
      position: relative;
      margin-bottom: 20px;
    }
    &-code {
      position: absolute;
      top: 50%;
      right: 20px;
      height: 28px;
      transform: translateY(-50%);
      cursor: pointer;
    }
    :deep(.arco-form-item-message) {
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translateY(100%);
    }
    :deep(.arco-input-wrapper) {
      height: 46px;
      border-radius: 8px;
      background-color: var(--color-fill-2) !important;
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
    .login-btn {
      height: 48px;
      font-size: 16px;
      border-radius: 10px;
    }
    .common-flex-between .arco-btn {
      padding: 0;
    }
  }
  .login-comet {
    position: absolute;
    top: 0;
    left: 80%;
    z-index: 100;
    width: 6px;
    height: 6px;
    background-color: hsl(0deg 0% 100% / 60%);
    border-radius: 50%;
    box-shadow: 0 0 40px 0 #edcda3, 0 0 20px 0 #fff, inset 0 0 8px hsl(0deg 0% 100% / 60%);
    transform: rotate(-45deg) translateY(-50px);
    opacity: 0.3;
    animation: cometAnim 6s infinite;
    pointer-events: none;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 20vw;
      height: 6px;
      background-color: hsl(0deg 0% 100% / 10%);
      border-radius: 50%;
      box-shadow: 0 0 20px rgb(237 205 163 / 40%);
      content: '';
    }
  }
}
</style>
