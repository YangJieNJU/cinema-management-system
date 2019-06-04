<template>
  <div>
  <div>
  <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">上架电影</el-button>
  <el-dialog title="新增电影" :visible.sync="dialogFormVisible">
    <el-form :model="newMovie" :rules="rules">
    <el-form-item label="电影名称" prop="name" label-width="120px">
      <el-input placeholder="请输入电影名称" v-model="newMovie.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="上映时间" prop="startDate" label-width="120px">
      <el-input v-model="newMovie.startDate" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影海报" prop="posterUrl" label-width="120px">
      <el-input placeholder="填写外部URL" v-model="newMovie.posterUrl" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="剧情介绍" label-width="120px">
      <el-input placeholder="请输入剧情介绍" type="textarea" :rows="4" v-model="newMovie.description" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影类型" label-width="120px">
      <el-input placeholder="电影类型" v-model="newMovie.type" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="片长（分钟）" label-width="120px">
      <el-input placeholder="请输入电影片长" v-model="newMovie.length" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="国家/地区" label-width="120px">
      <el-input placeholder="请输入电影国家/地区" v-model="newMovie.country" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影语言" label-width="120px">
      <el-input placeholder="请输入电影语言" v-model="newMovie.language" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影编剧" label-width="120px">
      <el-input placeholder="请输入电影编剧" v-model="newMovie.screenWriter" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影导演" label-width="120px">
      <el-input placeholder="请输入电影导演" v-model="newMovie.director" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影主演" label-width="120px">
      <el-input placeholder="请输入电影主演" v-model="newMovie.starring" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取消</el-button>
    <el-button type="primary" @click="onSubmit">确定</el-button>
  </div>
  </el-dialog>
  </div>
    <movie-information v-for="movie in movies" :key="movie.id" :movie="movie"></movie-information>
  </div>
</template>

<script>
import MovieInformation from '@/components/MovieInformation'
import { getAll, addMovie } from '@/api/movie'

export default {
  components: {
    'movie-information': MovieInformation
  },
  data() {
    return {
      movies: [],
      newMovie: {
        name: '',
        startDate: '',
        posterUrl: '',
        description: '',
        type: '',
        length: '',
        country: '',
        language: '',
        screenWriter: '',
        director: '',
        starring: ''
      },
      dialogFormVisible: false,
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
      }
    }
  },
  created() {
    this.getAllMovies()
  },
  methods: {
    getAllMovies() {
      getAll().then(response => {
        const { content: movies } = response
        this.movies = movies
      }).catch(error => {
        console.log(error)
      })
    },
    onSubmit() {
      addMovie(this.newMovie).then(response => {
        console.log(this.newMovie)
        this.dialogFormVisible = false
      })
    }
  }
}
</script>
