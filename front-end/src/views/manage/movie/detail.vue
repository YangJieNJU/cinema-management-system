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
          <el-footer style="padding: 0px; margin: 10px 0 0 0; width: 99%" height="20px">
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
            <el-button type='success' icon='el-icon-edit' @click="dialogFormVisible = true">{{'修改'}}</el-button>   
            <el-dialog title="修改电影" :visible.sync="dialogFormVisible">
            <el-form :model="movie" :rules="rules">
              <el-form-item label="电影名称" prop="name" label-width="120px">
                <el-input placeholder="请输入电影名称" v-model="movie.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="上映时间" prop="startDate" label-width="120px">
                <el-input v-model="movie.startDate" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电影海报" prop="posterUrl" label-width="120px">
                <el-input placeholder="填写外部URL" v-model="movie.posterUrl" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="剧情介绍" label-width="120px">
                <el-input placeholder="请输入剧情介绍" type="textarea" :rows="4" v-model="movie.description" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电影类型" label-width="120px">
                <el-input placeholder="电影类型" v-model="movie.type" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="片长（分钟）" label-width="120px">
                <el-input placeholder="请输入电影片长" v-model="movie.length" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="国家/地区" label-width="120px">
                <el-input placeholder="请输入电影国家/地区" v-model="movie.country" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电影语言" label-width="120px">
                <el-input placeholder="请输入电影语言" v-model="movie.language" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电影编剧" label-width="120px">
                <el-input placeholder="请输入电影编剧" v-model="movie.screenWriter" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电影导演" label-width="120px">
                <el-input placeholder="请输入电影导演" v-model="movie.director" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电影主演" label-width="120px">
                <el-input placeholder="请输入电影主演" v-model="movie.starring" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="onSubmit">确定</el-button>
            </div>
            </el-dialog>
            <el-button type='danger' icon='el-icon-delete' @click="dialogFormVisible2 = true">{{'下架'}}</el-button>   
            <el-dialog title="您确定要将电影下架吗？" :visible.sync="dialogFormVisible2">
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取消</el-button>
              <el-button type="primary" @click="offBatch">确定</el-button>
            </div>
            </el-dialog>
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
        prop="fare"
        label="票价（元）">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMovie, likeMovie, unlikeMovie, getSchedue, updateMovie, offbatchMovie } from '@/api/movie'

export default {
  data() {
    return {
      movieId: null,
      userId: null,
      movie: null,
      rules: {
        name: [
          { required: true, message: '此项不能为空！', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '此项不能为空！', trigger: 'blur' }
        ],
        posterUrl: [
          { required: true, message: '此项不能为空！', trigger: 'blur' }
        ]
      },
      schedueData: null,
      dialogFormVisible: false,
      dialogFormVisible2: false
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
    onSubmit() {
      updateMovie(this.movie).then(response => {
        console.log(this.movie)
        this.dialogFormVisible = false
      })
    },
    offBatch() {
      console.log(this.movie)
      offbatchMovie({ 'movieIdList': [this.movieId] }).then(response => {
        console.log(this.movie)
        this.dialogFormVisible = false
        this.$router.push({
        path: 'movie'
      })
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

