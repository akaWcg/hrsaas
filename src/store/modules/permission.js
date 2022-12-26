import { constantRoutes, asyncRoutes } from '@/router'

export default {
  namespaced: true,
  state() {
    return {
      routes: constantRoutes
    }
  },
  mutations: {
    SET_ROUTES(state, newRoutes) {
      state.routes = [...constantRoutes, ...newRoutes]
    }
  },
  actions: {
    filterRoutes(context, menus) {
      const routes = []
      menus.forEach((key) => {
        routes.push(...asyncRoutes.filter((item) => item.name === key))
      })
      context.commit('SET_ROUTES', routes)
      return routes
    }
  }
}
