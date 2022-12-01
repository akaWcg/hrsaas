import request from '@/utils/request'
// 登录接口 需要数据data data是mobile和password
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {}

export function logout() {}
