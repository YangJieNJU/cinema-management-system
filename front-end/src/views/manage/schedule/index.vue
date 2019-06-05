<template>
<div>
<el-form :inline="true" :model="setSchedue" class="demo-form-inline">
<el-form-item label="选择影厅">
    <el-select v-model="aSchedule.hallId" placeholder="选择影厅">
      <el-option label="1号厅" value="1"></el-option>
      <el-option label="2号厅" value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="选择日期">
    <div class="block">
      <el-date-picker v-model="setSchedue.date" type="date" placeholder="选择日期"></el-date-picker>
    </div>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">新增排片</el-button>
  <el-dialog title="新增排片" :visible.sync="dialogFormVisible">
    <el-form :model="aSchedule" :rules="rules">
    <el-form-item label="电影名称" prop="movieId" label-width="120px">
      <el-input placeholder="请输入电影Id" v-model="aSchedule.movieId" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="放映厅" prop="hallId" label-width="120px">
      <el-select v-model="aSchedule.hallId" placeholder="选择影厅">
        <el-option label="1号厅" value="1"></el-option>
        <el-option label="2号厅" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="电影起止时间" prop="startTime" label-width="120px">
      <div class="block">
        <el-date-picker v-model="startendTime" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item label="价格（元）" prop="fare" label-width="120px">
      <el-input placeholder="请输入电影价格" v-model="aSchedule.fare" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取消</el-button>
    <el-button type="primary" @click="onSubmit">确定</el-button>
  </div>
  </el-dialog>
  </el-form-item>
</el-form>
  <el-table
      :data="schedules"
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
        prop="movieName"
        label="电影名">
      </el-table-column>
      <el-table-column
        prop="fare"
        label="票价（元）">
      </el-table-column>
    </el-table>
    <div style="display: none">{{ watchHallId }}</div>
  </div>
</template>

<script>
import { getAllSchedue, addSchedule } from '@/api/movie'
import { formatTime } from '@/utils/format'

export default {
  data() {
    return {
      movieId: null,
      userId: null,
      movie: null,
      chooseDate: '2019/06/05',
      hallId: '1',
      startendTime: null,
      setSchedue: {
        hall: '1',
        date: '2019/06/06'
      },
      aSchedule: {
        startTime: null,
        endTime: null,
        movieId: null,
        hallId: '1',
        fare: null
      },
      schedueData: null,
      dialogFormVisible: false,
      rules: {
        startTime: [
          { required: true, message: '此项不能为空！', trigger: 'blur' }
        ],
        movieId: [
          { required: true, message: '此项不能为空！', trigger: 'blur' }
        ],
        hallId: [
          { required: true, message: '此项不能为空！', trigger: 'blur' }
        ],
        fare: [
          { required: true, message: '此项不能为空！', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.movieId = this.$route.query.movieId
    this.userId = this.$store.state.user.token
    // this.fetchMovie(this.movieId, this.userId)
    this.fetchSchedue()
  },
  computed: {
    schedules: function() {
      if (!this.schedueData) {
        return []
      }
      console.log(JSON.stringify(this.schedueData))
      return this.schedueData.map(x => {
        x.startTime = formatTime(x.startTime)
        x.endTime = formatTime(x.endTime)
        return x
      })
    },
    watchHallId: function() {
      this.fetchSchedue()
      return this.aSchedule.hallId
    }
  },
  methods: {
    fetchSchedue: function() {
      getAllSchedue({ 'hallId': parseInt(this.aSchedule.hallId), 'startDate': this.chooseDate }).then(response => {
        const { content: data } = response
        this.schedueData = data.map(x => x.scheduleItemList).reduce((res, scheduleItemList) => res.concat(scheduleItemList))
      })
    },
    onSubmit() {
      console.log(this.startendTime)
      this.aSchedule.startTime = this.startendTime[0]
      this.aSchedule.endTime = this.startendTime[1]
      console.log(this.aSchedule.startTime)
      console.log(this.aSchedule.endTime)
      addSchedule(this.aSchedule).then(response => {
        console.log(this.aSchedule)
        this.dialogFormVisible = false
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

