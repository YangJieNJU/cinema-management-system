<template>
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
              <el-button :type="this.movie.islike == 0 ? 'warning' : 'danger'" :icon="this.movie.islike == 0 ? 'el-icon-star-off' : 'el-icon-star-on'" @click.native.prevent="handleLike">{{this.movie.islike == 0 ? '想看' : '已想看'}}</el-button>
            </el-row>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
  </el-card>



</template>

<script>
import { getMovie, likeMovie, unlikeMovie } from '@/api/movie'

export default {
  data() {
    return {
      movieId: null,
      userId: null,
      movie: null
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
        if (this.movie.country == null) {
          this.movie.country = '未知'
        }
        if (this.movie.description == null) {
          this.movie.description = '暂无简介'
        }
        if (this.movie.director == null) {
          this.movie.director = '未知'
        }
        if (this.movie.language == null) {
          this.movie.language = '未知'
        }
        if (this.movie.screenWriter == null) {
          this.movie.screenWriter = '未知'
        }
        if (this.movie.starring == null) {
          this.movie.starring = '未知'
        }
        if (this.movie.type == null) {
          this.movie.type = '未知'
        }
      })
    },
    handleLike() {
      if (this.movie.islike == 0) {
        likeMovie(this.movieId, { 'userId': parseInt(this.userId) }).then(response => {
          console.log(response)
        })
      }
      else {
        unlikeMovie(this.movieId, { 'userId': parseInt(this.userId) }).then(response => {
          console.log(response)
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

