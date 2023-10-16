import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Message, Modal } from '@arco-design/web-vue'
import piniaPersist from 'pinia-plugin-persist'
import ArcoIcon from '@arco-design/web-vue/es/icon'
import App from '@/App.vue'
import router from '@/router'
import '@/assets/styles/index.less'

// vant3 以函数的形式提供的组件，不能自动导入样式
import '@arco-design/web-vue/es/message/style/index.js'
import '@arco-design/web-vue/es/modal/style/index.js'

const pinia = createPinia()
pinia.use(piniaPersist)

window.Message = Message
window.Modal = Modal

const app = createApp(App)
app.use(ArcoIcon).use(pinia).use(router).mount('#app')
