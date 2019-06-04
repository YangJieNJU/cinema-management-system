import request from '@/utils/request'

export function getOccupiedSeats(id) {
  return request({
    url: '/ticket/get/occupiedSeats',
    method: 'get',
    params: {
      scheduleId: id
    }
  })
}

export function lockSeats(data) {
  return request({
    url: '/ticket/lockSeat',
    method: 'post',
    data
  })
}

export function userBuy(ticketIds) {
  return request({
    url: `/ticket/buy?ids=${ticketIds.join('&ids=')}&&couponId=-1`,
    method: 'post'
  })
}

export function getUserTickets(userId) {
  return request({
    url: `/ticket/get/${userId}`,
    method: 'get'
  })
}
