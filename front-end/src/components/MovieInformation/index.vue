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
              <el-col :span="24"> 上映：{{ `${this.movie.startDate.split('T')[0]} ${this.movie.startDate.split('T')[1].split('\.')[0]}` }}</el-col>
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
              <el-button :type="this.islike == 0 ? 'warning' : 'danger'" :icon="this.movie.islike == 0 ? 'el-icon-star-off' : 'el-icon-star-on'" @click.native.prevent="handleLike">{{this.islike == 0 ? '想看' : '不想看'}}</el-button>
            </el-row>
            </el-footer>
          </el-container>
        </el-main>
      </el-container>
    </el-card>
</template>

<script>
import { likeMovie, unlikeMovie } from '@/api/movie'

export default {
  props: {
    movie: {
      type: Object,
      required: true
    },
    movieId: {
      required: true
    },
    userId: {
      required: true
    }
  },
  computed: {
    islike: function() {
      return this.movie.islike
    }
  },
  methods: {
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

