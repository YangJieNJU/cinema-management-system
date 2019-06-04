<template>
<div>
  <el-card :body-style="{ padding: '0px' }">
    <el-container>
      <el-aside
        style="width: 200px"
        >
        <el-image
          :src="this.movie.posterUrl"
          style="width: 100%; height: 100%"
          fit="fill"
          >
        </el-image>
      </el-aside>
      <el-main
        style="padding: 10px 20px 200px 20px"
        class="main"
        >
        <el-container
          style="padding: 0px"
          >
          <el-main
            style="padding: 0px; margin: 5px 0"
            >
            <span class="movie-description">
              {{ this.movie.description }}
            </span>
          </el-main>
          <el-footer
            style="padding: 0px; margin: 10px 0 0 0; width: 99%"
            height="20px"
          >
            <el-row style="height: 100%">
              <el-col :span="24"> 上映：{{ this.movie.startDate }}</el-col>
            </el-row>
            <el-row style="height: 100%">
              <el-col :span="24"> 类型：{{ this.movie.type }}</el-col>
            </el-row>
            <el-row style="height: 100%">
              <el-col :span="24"> 地区：{{ this.movie.country }}</el-col>
            </el-row>
            <el-row style="height: 100%">
              <el-col :span="24"> 语言：{{ this.movie.language }}</el-col>
            </el-row>
            <el-row style="height: 100%">
              <el-col :span="24"> 导演：{{ this.movie.director }}</el-col>
            </el-row>
            <el-row style="height: 100%">
              <el-col :span="24"> 主演：{{ this.movie.starring }}</el-col>
            </el-row>
            <el-row style="height: 100%">
              <el-col :span="24"> 编剧：{{ this.movie.screenWriter }}</el-col>
            </el-row>
            <el-row style="height: 100%">
              <el-col :span="24"> </el-col>
            </el-row>
            <el-row style="height: 100%">
              <el-button :type="this.islike == 0 ? 'warning' : 'danger'" :icon="this.movie.islike == 0 ? 'el-icon-star-off' : 'el-icon-star-on'" @click.native.prevent="handleLike">{{this.islike == 0 ? '想看' : '已想看'}}</el-button>
            </el-row>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
  </el-card>
  <el-table
      :data="schedueData"
      style="width: 100%">
      <el-table-column
        prop="startTime"
        label="放映开始时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="放映结束时间">
      </el-table-column>
      <el-table-column
        prop="hallName"
        label="放映厅">
      </el-table-column>
      <el-table-column
        prop="hallName"
        label="票价（元）">
      </el-table-column>
      <el-table-column label="选座购票"  align="center">
        <template slot-scope="scope">
          <el-button type="text" @click.native.prevent="buyTicket(scope.row.id)">选座购票</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMovie, likeMovie, unlikeMovie, getSchedue } from '@/api/movie'

export default {
  data() {
    return {
      movieId: null,
      userId: null,
      movie: null,
      schedueData: null
    }
  },
  created() {
    this.movieId = this.$route.query.movieId
    this.userId = this.$store.state.user.token
    this.fetchMovie(this.movieId, this.userId)
    this.fetchSchedue(this.movieId)
  },
  computed: {
    islike: function() {
      return this.movie.islike
    }
  },
  methods: {
    fetchMovie: function(movieId, userId) {
      getMovie(movieId, userId).then(response => {
        const { content: movie } = response
        this.movie = movie
        this.movie.country = this.movie.country || '未知'
        this.movie.description = this.movie.description || '暂无简介'
        this.movie.director = this.movie.director || '未知'
        this.movie.language = this.movie.language || '未知'
        this.movie.screenWriter = this.movie.screenWriter || '未知'
        this.movie.starring = this.movie.starring || '未知'
        this.movie.type = this.movie.type || '未知'
      })
    },
    fetchSchedue: function(movieId) {
      getSchedue({ 'movieId': parseInt(movieId) }).then(response => {
        const { content: data } = response
        for(const schedule of data) {
          if(schedule.scheduleItemList.length > 0) {
            this.schedueData = schedule.scheduleItemList
            break;
          }
        }
      })
    },
    handleLike() {
      if (this.movie.islike == 0) {
        likeMovie(this.movieId, { 'userId': parseInt(this.userId) }).then(response => {
          this.movie.islike = 1
        })
      } else {
        unlikeMovie(this.movieId, { 'userId': parseInt(this.userId) }).then(response => {
          this.movie.islike = 0
        })
      }
    },
    buyTicket(id) {
      console.log(id)
      this.$router.push({
        path: 'payment',
        query: {
          movieId: this.movie.id,
          scheduleId: id
        }
      })
    }
  }
}
</script>

<style scoped>
* {
  font-size: 15px;
}

.el-card {
  margin: 10px 20px 20px 10px;
}

.movie-description {
  color: #666;
  font-size: 14px;
}

.main {
  position: relative;
}

.footer {
  position: absolute;
  bottom: 0;
}

.detail {
  color: #409EFF;
}

.right-align {
  float: right;
}

.max-height {
  height: 100%;
}
</style>

