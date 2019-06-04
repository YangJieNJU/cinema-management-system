<template>
  <div>
    <el-container>
      <el-main>
        <el-row v-for="(rowSeats, i) in renderSeats" :key="i">
          <el-col :span="1" v-for="(seat, j) in rowSeats"
            :key="j"
            >
            <div
              @click="handleChooseSeat(i, j)">
              <svgicon
                :name="'seat-empty'"
                :color="renderSeats[i][j] == 0 ? '#409EFF' : (renderSeats[i][j] == 1 ? '#909399' : '#F56C6C')"
                :fill="true"
                :width="'80%'"
                :height="'80%'"
                >
              </svgicon>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-aside>
      </el-aside>
    </el-container>
    <router-link :to="'order'">
      <el-button>{{ movieId }}</el-button>
    </router-link>
  </div>
</template>

<script>
import { getOccupiedSeats } from '@/api/ticket'

export default {
  data() {
    return {
      movieId: null,
      scheduleId: null,
      seats: null,
      scheduleItem: null,
      seatSize: '30px'
    }
  },
  computed: {
    renderSeats: function() {
      console.log('here')
      return this.seats
    }
  },
  created() {
    this.movieId = this.$route.query.movieId
    this.scheduleId = this.$route.query.scheduleId
    this.getSeats()
  },
  methods: {
    getSeats: function() {
      getOccupiedSeats(this.scheduleId).then(response => {
        const { content: info } = response
        this.seats = info.seats
        this.scheduleItem = info.scheduleItem
      })
    },
    handleChooseSeat: function(i, j) {
      switch(this.seats[i][j]) {
        case 0:
          this.$set(this.seats[i], j, 2)
        case 1:
          break;
        case 2:
          this.$set(this.seats[i], j, 0)
      }
    },
    seatState: function(i, j) {
      var svgImage = 'seat-choosed'
      return svgImage
    }
  }
}
</script>

<style scoped>
.el-main {
  width: 200px;
}
</style>

