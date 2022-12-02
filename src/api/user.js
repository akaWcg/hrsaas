import request from '@/utils/request'
// 登录接口 需要数据data data是mobile和password
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
// 获取用户信息接口
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export function getInfo(token) {}

export function logout() {}
