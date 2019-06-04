<template>
  <div>
    <div v-if="$route.meta.keepAlive">
      <keep-alive>
        <movie-info :movie="movie" :userId="userId" :movieId="movieId">
        </movie-info>
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
import { getMovie } from '@/api/movie'
import MovieInformation from '@/components/MovieInformation'

export default {
  components: {
    'movie-info': MovieInformation
  },
  data() {
    return {
      movieId: null,
      userId: null,
      movie: null
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

