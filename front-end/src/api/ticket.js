import request from '@/utils/request'

export function getOccupiedSeats(id) {
  return request({
    url: '/ticket/get/occupiedSeats',
    params: {
      scheduleId: id
    }
  })
}
