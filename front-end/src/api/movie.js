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

export function addMovie(data) {
  return request({
    url: '/movie/add',
    method: 'post',
    data
  })
}

export function updateMovie(data) {
  return request({
    url: '/movie/update',
    method: 'post',
    data
  })
}

export function offbatchMovie(data) {
  return request({
    url: '/movie/off/batch',
    method: 'post',
    data
  })
}

export function likeMovie(movieId, data) {
  return request({
    url: `/movie/${movieId}/like`,
    method: 'post',
    params: data
  })
}

export function unlikeMovie(movieId, data) {
  return request({
    url: `/movie/${movieId}/unlike`,
    method: 'post',
    params: data
  })
}

export function getSchedue(data) {
  return request({
    url: `/schedule/search/audience`,
    method: 'get',
    params: data
  })
}

export function getScheduleById(id) {
  return request({
    url: `/schedule/${id}`,
    method: 'get'
  })
}
