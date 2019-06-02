import request from '@/utils/request'

export function getAll() {
  return request({
    url: '/movie/all',
    method: 'get'
  })
}

export function getMovie(movieId, userId) {
  return request({
    url: `/movie/${movieId}/${userId}`,
    method: 'get'
  })
}
