<template>
  <div v-if="loading">
    <el-container :direction="'vertical'">
      <el-main>
        <el-table
          :data="ticketsInfo"
          style="width: 80%; margin: 0 10%"
          >
          <el-table-column
            prop="item"
            label="场次"
            :width="colWidth">
          </el-table-column>
          <el-table-column
            prop="position"
            label="座位"
            :width="colWidth">
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            :width="colWidth">
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-button
          type="primary"
          class="position"
          @click.native.prevent="handleOrder"
          >
          确认支付{{ totalPrice }}元
        </el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { lockSeats, userBuy } from '@/api/ticket'
import { getScheduleById } from '@/api/movie'

export default {
  data() {
    return {
      userId: null,
      scheduleId: null,
      seats: null,
      tickets: null,
      colWidth: '300px',
      schedule: null,
      loading: false
    }
  },
  created() {
    this.userId = this.$store.state.user.token
    this.scheduleId = this.$route.query.scheduleId
    this.seats = this.$route.query.seats
    this.movieId = this.$route.query.movieId
    this.getTickets()
    this.getSchedule()
  },
  computed: {
    ticketsInfo: function() {
      if (this.tickets === null || this.schedule == null) {
        return []
      }
      return this.tickets.map(x => {
        return {
          item: `${this.schedule.hallName} ${x.time.split('T')[0]} ${x.time.split('T')[1].split('\.')[0]}`,
          position: `${x.rowIndex + 1}排${x.columnIndex + 1}座`,
          price: this.schedule.fare
        }
      })
    },
    totalPrice: function() {
      return this.ticketsInfo.length * this.schedule.fare || 0
    },
    ticketIds: function() {
      return this.tickets.map(x => {
        return x.id
      })
    }
  },
  methods: {
    getTickets() {
      lockSeats({
        userId: this.userId,
        scheduleId: this.scheduleId,
        seats: this.seats
      }).then(response => {
        const { content: tickets } = response
        this.tickets = tickets,
        this.loading = true
      }).catch(err => {
        console.log(err)
      })
    },
    getSchedule() {
      getScheduleById(this.scheduleId).then(response => {
        const { content: item } = response
        this.schedule = item
      }).catch(err => {
        console.log(err)
      })
    },
    handleOrder() {
      userBuy(this.ticketIds).then(response => {
        this.$router.push({
          path: 'success',
          query: {
            movieId: this.movieId
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.position {
  margin-left: 80%;
}
</style>

