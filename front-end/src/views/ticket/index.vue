<template>
  <el-main>
    <el-row v-for="(ticket, i) in formatted" :key="i" style="margin: 20px 0">
        <ticket-card :ticket="ticket"></ticket-card>
    </el-row>
  </el-main>
</template>

<script>
import TicketCard from '@/components/TicketCard'
import { getUserTickets } from '@/api/ticket'
import { getScheduleById, getMovie } from '@/api/movie'

export default {
  components: {
    'ticket-card': TicketCard
  },
  data() {
    return {
      userId: null,
      schedules: new Array(),
      movies: new Array(),
      formatted: [],
      tickets: [
        {
          movieName: '黄金时代',
          hall: 'max巨幕厅',
          price: '30',
          seat: '二排一座',
          time: '2019.5.18',
          posterUrl: 'http://hbimg.b0.upaiyun.com/07b3b8977763bedc8b6b2d3bcdd36defdcb00c1da4e7-WhZGy4_fw658',
          status: '已完成',
          startTime: '20:00:00',
          endTime: '22:00:00'
        },
        {
          movieName: '黄金时代',
          hall: 'max巨幕厅',
          price: '30',
          seat: '二排一座',
          time: '2019.5.18',
          posterUrl: 'http://hbimg.b0.upaiyun.com/07b3b8977763bedc8b6b2d3bcdd36defdcb00c1da4e7-WhZGy4_fw658',
          status: '已完成',
          startTime: '20:00:00',
          endTime: '22:00:00'
        },
        {
          movieName: '黄金时代',
          hall: 'max巨幕厅',
          price: '30',
          seat: '二排一座',
          time: '2019.5.18',
          posterUrl: 'http://hbimg.b0.upaiyun.com/07b3b8977763bedc8b6b2d3bcdd36defdcb00c1da4e7-WhZGy4_fw658',
          status: '已完成',
          startTime: '20:00:00',
          endTime: '22:00:00'
        }
      ]
    }
  },
  created() {
    this.userId = this.$store.state.user.token
    this.getTickets()
  },
  methods: {
    getTickets() {
      getUserTickets(this.userId).then(response => {
        const { content: data } = response
        this.tickets = data
        this.getSchedules()
        console.log(this.formatTickets)
      }).catch(err => console.log(err))
    },
    getSchedules() {
      var scheduleIds = this.tickets.map(x => x.scheduleId)
      scheduleIds = new Set(scheduleIds)
      scheduleIds = [...scheduleIds]
      const scheduleRequests = scheduleIds.map(x => getScheduleById(x))
      Promise.all(scheduleRequests).then(res => {
        for (let i = 0; i < res.length; ++i) {
          const schedule = res[i].content
          this.schedules[schedule.id] = schedule
        }
        this.getMovies()
      }).catch(err => console.log(err))
    },
    getMovies() {
      var movieIds = []
      for (const each in this.schedules) {
        movieIds.push(this.schedules[each].movieId)
      }
      movieIds = [...(new Set(movieIds))]
      const movieRequests = movieIds.map(x => getMovie(x, this.userId))
      Promise.all(movieRequests).then(res => {
        for (let i = 0; i < res.length; ++i) {
          const movie = res[i].content
          this.movies[movie.id] = movie
        }
        this.formatTickets()
      }).catch(err => console.log(err))
    },
    formatTime(dateTime) {
      return `${dateTime.split('T')[0]} ${dateTime.split('T')[1].split('\.')[0]}`
    },
    formatTickets() {
      if (this.movies == null || this.schedules == null) {
        return []
      }
      console.log(this.movies)
      this.formatted = this.tickets.map(each => {
        return {
          ticketId: each.id,
          posterUrl: this.movies[this.schedules[each.scheduleId].movieId].posterUrl,
          movieName: this.schedules[each.scheduleId].movieName,
          seat: `${each.rowIndex + 1}排${each.columnIndex + 1}座`,
          time: `${each.time.split('T')[0]} ${each.time.split('T')[1].split('\.')[0]}`,
          hall: this.schedules[each.scheduleId].hallName,
          startTime: this.formatTime(this.schedules[each.scheduleId].startTime),
          endTime: this.formatTime(this.schedules[each.scheduleId].endTime),
          price: this.schedules[each.scheduleId].fare,
          status: each.vo.state,
        }
      })
    }
  }
}
</script>

<style>
.el-main{
  margin: 0 12%;
}
</style>
