import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  namespaced: true,
  state() {
    return {
      // vuex Token值 从本地缓存中获取
      token: getToken() || null
    }
  },
  mutations: {
    // 设置Token
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    // 删除Token
    REMOVE_TOKEN(state) {
      state.token = null
      removeToken()
    }
  },
  actions: {
    async login(context, data) {
      const res = await login(data)
      if (res.data.success) {
        context.commit('SET_TOKEN', res.data.data)
      }
    }
  }
}
