import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  // 跨域代理 两种环境 开发和生产
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 超值时间
})
service.interceptors.request.use()
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
    Message.error(error.message)
    return Promise.reject(error)
  }
)
export default service
