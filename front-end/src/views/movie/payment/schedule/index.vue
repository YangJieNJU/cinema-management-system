<template>
  <el-table
    :data="schedueData"
    style="width: 90%; margin: 0 5%">
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
      prop="fare"
      label="票价（元）">
    </el-table-column>
    <el-table-column label="选座购票"  align="center">
      <template slot-scope="scope">
        <el-button type="text" @click.native.prevent="buyTicket(scope.row.id)">选座购票</el-button>
      </template>
    </el-table-column>
  </el-table>
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
        this.schedueData = data.map(x => x.scheduleItemList).reduce((res, scheduleItemList) => res.concat(scheduleItemList))
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
    },
    buyTicket(id) {
      console.log(id)
      this.$router.push({
        path: 'seat',
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
