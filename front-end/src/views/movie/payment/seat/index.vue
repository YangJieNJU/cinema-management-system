<template>
  <div v-if="loading">
    <el-card style="margin: 2% 5% 0 5%">
      <el-container>
        <el-main style="width: 200px">
          <el-row v-for="(rowSeats, i) in renderSeats" :key="i">
            <el-col :span="4"> {{ `` }}</el-col>
            <el-col
              :span="2"
              v-for="(seat, j) in rowSeats"
              :key="j"
              >
              <div
                @click="handleChooseSeat(i, j)">
                <svgicon
                  :name="'seat-empty'"
                  :color="renderSeats[i][j] == 0 ? '#409EFF' : (renderSeats[i][j] == 1 ? '#909399' : '#F56C6C')"
                  :fill="true"
                  :width="'70%'"
                  :height="'70%'"
                  >
                </svgicon>
              </div>
            </el-col>
          </el-row>
        </el-main>
        <el-aside :width="'40%'">
          <el-main>
            <el-row>
              <div>
                <el-button type="text">座位：</el-button>
              </div>
              <el-row v-for="(tmpSeats, i) in formatSeats" :key="i" :gutter="20" style="padding: 5px">
                <el-col v-for="(seat, j) in tmpSeats" :key="j" :span="6">
                  <el-tag
                    closable
                    :type="''"
                    @close="handleChooseSeat(seat.row, seat.col)"
                    >
                    {{ `${seat.row + 1}排${seat.col + 1}列` }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-row>
          </el-main>
          <el-footer>
            <el-button type="primary" @click.native.prevent="buyTicket()">确认信息，下单</el-button>
          </el-footer>
        </el-aside>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import { getOccupiedSeats } from '@/api/ticket'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      movieId: null,
      scheduleId: null,
      seats: null,
      scheduleItem: null,
      loading: false
    }
  },
  computed: {
    renderSeats: function() {
      return this.seats
    },
    selectedSeats: function() {
      var selSeats = []
      for (let i = 0; i < this.seats.length; ++i) {
        for (let j = 0; j < this.seats[i].length; ++j) {
          if (parseInt(this.seats[i][j]) !== 2) {
            continue
          }
          selSeats.push({
            'rowIndex': i,
            'columnIndex': j
          })
        }
      }
      return selSeats
    },
    formatSeats: function() {
      var selSeats = []
      for (let i = 0; i < this.seats.length; ++i) {
        for (let j = 0; j < this.seats[i].length; ++j) {
          if (parseInt(this.seats[i][j]) !== 2) {
            continue
          }
          selSeats.push({
            'row': i,
            'col': j
          })
        }
      }
      const sectionCount = 4
      var arrTmp = []
      for (let i = 0; i < selSeats.length; ++i) {
        const index = parseInt(i / sectionCount)
        if (index >= arrTmp.length) {
          arrTmp.push([])
        }
        arrTmp[index].push(selSeats[i])
      }
      return arrTmp
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
        this.loading = true
      }).catch(err => {
        console.log(err)
      })
    },
    handleChooseSeat: function(i, j) {
      switch (this.seats[i][j]) {
        case 0:
          this.$set(this.seats[i], j, 2)
          break
        case 1:
          break
        case 2:
          this.$set(this.seats[i], j, 0)
          break
      }
    },
    seatState: function(i, j) {
      var svgImage = 'seat-choosed'
      return svgImage
    },
    buyTicket: function() {
      if (this.selectedSeats.length <= 0) {
        Message.error('请选择座位')
        return
      }
      this.$router.push({
        path: 'order',
        query: {
          seats: this.selectedSeats,
          scheduleId: this.scheduleId,
          movieId: this.movieId
        }
      })
    }
  }
}
</script>

<style scoped>
</style>

