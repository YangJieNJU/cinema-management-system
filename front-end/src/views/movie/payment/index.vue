<template>
  <div>
    <div v-if="$route.meta.keepAlive">
      <keep-alive>
        <el-card :body-style="{ padding: '0px' }">
    <el-container v-if="loading">
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
          <el-footer style="padding: 0px; margin: 10px 0 0 0; width: 99%" height="20px">
            <el-row style="height: 100%">
              <el-col :span="24"> 上映：{{ formatStartTime }}</el-col>
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
              <el-button :type="this.movie.islike == 0 ? 'warning' : 'danger'" :icon="this.movie.islike == 0 ? 'el-icon-star-off' : 'el-icon-star-on'" @click.native.prevent="handleLike">{{this.movie.islike == 0 ? '收藏' : '已收藏'}}</el-button>
            </el-row>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
  </el-card>
      </keep-alive>
      <keep-alive>
        <el-steps :active="active" finish-status="success" style="margin: 0 5% 3% 5%">
          <el-step title="选择场次"></el-step>
          <el-step title="选择座位"></el-step>
          <el-step title="确认订单"></el-step>
          <el-step title="支付成功"></el-step>
        </el-steps>
      </keep-alive>
    </div>
    <router-view :key="key" ></router-view>
  </div>
</template>

<script>
import { getMovie, likeMovie, unlikeMovie } from '@/api/movie'
import MovieInformation from '@/components/MovieInformation'
import { formatTime } from '@/utils/format'

export default {
  components: {
    'movie-info': MovieInformation
  },
  data() {
    return {
      movieId: null,
      userId: null,
      movie: null,
      loading: false
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    },
    active() {
      if (this.$route.path === '/movie/payment/schedule') {
        return 1
      } else if (this.$route.path === '/movie/payment/seat') {
        return 2
      } else if (this.$route.path === '/movie/payment/order') {
        return 3
      } else { return 4 }
    },
    formatStartTime: function () {
      return formatTime(this.movie.startDate)
    }
  },
  created() {
    this.movieId = this.$route.query.movieId
    this.userId = this.$store.state.user.token
    this.fetchMovie(this.movieId, this.userId)
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
        this.loading = true
      })
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
    },
    handleLike() {
      if (parseInt(this.movie.islike) === 0) {
        likeMovie(this.movieId, { 'userId': parseInt(this.userId) }).then(response => {
          this.movie.islike = 1
        })
      } else {
        unlikeMovie(this.movieId, { 'userId': parseInt(this.userId) }).then(response => {
          this.movie.islike = 0
        })
      }
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

