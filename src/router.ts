import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

const modules = import.meta.glob('./views/**/**.vue')

const routes: any = [{ path: '/', redirect: '/home' }]

NProgress.configure({ showSpinner: false })

// eslint-disable-next-line
for (const path in modules) {
  if (path.indexOf('components') === -1) {
    const component = modules[path]
    const name = path
      .replace(/^\.\/(?:views)(.*)\.\w+$/, '$1')
      .toLowerCase()
      .replace('index', '')

    routes.push({ path: name, component })
  }
}

const router = createRouter({
  routes,
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 0)
    })
  }
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (to.matched.length === 0) {
    return next('/404') // 如果未匹配到路由
  }

  // 标题
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }

  return next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
