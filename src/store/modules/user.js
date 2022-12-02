import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  namespaced: true,
  state() {
    return {
      // vuex Token值 从本地缓存中获取
      token: getToken() || null,
      // 存放用户数据 定义空对象
      userInfo: {}
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
    },
    // 设置用户数据
    SET_USER_INFO(state, result) {
      // 响应式
      state.userInfo = result
      // state.userInfo = { ...result }
      // 浅拷贝方式
    },
    // 删除用户信息
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async login(context, data) {
      const res = await login(data)
      context.commit('SET_TOKEN', res)
    },
    // 请求用户数据
    async getUserInfo(context) {
      const result = await getUserInfo()
      context.commit('SET_USER_INFO', result)
      return result
    }
  }
}
