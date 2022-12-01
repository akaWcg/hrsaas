import axios from 'axios'
const service = axios.create({
  // 跨域代理 两种环境 开发和生产
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 超值时间
})
service.interceptors.request.use()
service.interceptors.response.use()
export default service
