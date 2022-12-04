import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from './auth'
import router from '@/router'
const TimeOut = 3600
const service = axios.create({
  // 跨域代理 两种环境 开发和生产
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 超值时间
})
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      if (IsCheckTimeOut()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token超时了'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 10002
    ) {
      store.dispatch('user/login')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)
// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service
