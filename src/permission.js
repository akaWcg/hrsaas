import router from './router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress'
// 白名单
const whiteList = ['/login', '/404']
// 前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启进度条
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        const routes = await store.dispatch(
          'permission/filterRoutes',
          roles.menus
        )
        router.addRoutes([
          ...routes,
          { path: '*', redirect: '/404', hidden: true }
        ])
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done() // 手动强制关闭 解决手动切换地址时进度条不关闭
})
// 后置守卫
router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
