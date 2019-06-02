import request from '@/utils/request'

export function getAll() {
  return request({
    url: '/movie/all',
    method: 'get'
  })
}
