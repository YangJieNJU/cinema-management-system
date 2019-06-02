<template>
  <el-card :body-style="{ padding: '0px' }">
    <el-container>
      <el-aside
        style="width: 120px"
        >
        <el-image
          :src="movie.posterUrl"
          style="width: 100%; height: 100%"
          fit="fill"
          >
        </el-image>
      </el-aside>
      <el-main
        style="padding: 10px 20px 0px 20px"
        class="main"
        >
        <el-container
          style="padding: 0px"
          >
          <el-header
            style="padding: 0px 5px 0px 0px; margin: 5px 0"
            height="25px"
            >
            <el-row style="height: 100%" :gutter="20">
              <el-col :span="4">
                <el-link type="primary">
                  <router-link :to="{ path: '/movie/detail', query: { movieId: movie.id }}">
                    <span class="detail right-align">{{ movie.name }}</span>
                  </router-link>
                </el-link>
              </el-col>
              <el-col
                :span="2"
                >
                <el-link
                  :type="movie.status == 1 ? 'info' : 'danger'"
                  >
                  {{ movie.status == 1 ? '热映中' : '已下架' }}
                </el-link>
              </el-col>
              <el-col :span="1" :offset="15">
                <el-rate
                  v-model="movie.islike"
                  :max="1"
                  disabled
                  class="right-align max-heigth"
                  >
                </el-rate>
              </el-col>
              <el-col :span="2"> <span class="right-align">{{ movie.likeCount || 0 }}人想看</span></el-col>
            </el-row>
          </el-header>
          <el-main
            style="padding: 0px; margin: 5px 0"
            >
            <span class="movie-description">
              {{ movie.description }}
            </span>
          </el-main>
          <el-footer
            style="padding: 0px; margin: 10px 0 0 0; width: 99%"
            height="20px"
          >
            <el-row style="height: 100%">
              <el-col :span="8"> 导演：{{ movie.director }}</el-col>
              <el-col :span="14"> 主演：{{ movie.starring }}</el-col>
              <el-col :span="2">
                <router-link :to="{ path: '/movie/detail', query: { movieId: movie.id }}">
                  <span class="detail right-align">详情</span>
                </router-link>
              </el-col>
            </el-row>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: null
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

