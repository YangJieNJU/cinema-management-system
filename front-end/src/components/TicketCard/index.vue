<template>
  <el-card class="box-card" :body-style="{ padding: '0' }">
    <div class="head">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button type="text">
            订单号：{{ ticket.ticketId }}
          </el-button>
        </el-col>
        <el-col :span="2" :offset="19">
          <el-button icon="el-icon-delete" type="text"></el-button>
        </el-col>
      </el-row>
    </div>
    <div class="main">
      <el-row class="main">
        <el-col :span="4">
          <el-image
          style="height: 150px"
          :src="ticket.posterUrl"
          fit="fill"
          class="image"></el-image>
        </el-col>
        <el-col :span="12" style="height: 100%">
          <div class="movie-info">
            <h2 style="color: black">{{ ticket.movieName }}</h2>
            <span >{{ ticket.seat }}</span>
            <br>
            <span>{{ ticket.time }}</span>
            <br>
            <span>{{ ticket.hall }}</span>
            <br>
            <br>
            <span style="color: sliver">放映时间{{ticket.startTime}}~{{ticket.endTime}}</span>
          </div>
        </el-col>
        <el-col :span="4" style="height: 100%; padding: 10% 0">
          ￥{{ticket.price}}
        </el-col>
        <el-col :span="4" style="height: 100%; padding: 10% 0">
          {{ticket.status}}
        </el-col>
      </el-row>
    </div>
</el-card>

</template>

<script>
export default {
  name: 'TicketCard',
  props: {
    ticket: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.head{
  background-color:whitesmoke;
  padding: 0;
  height: 53px;
  width: 100%;
}
.main{
  width: 100%;
  height: 200px;
}
.box-card {
  width: 882px;
  height: 100%;
}
.main{
  width: 100%;
}
.image{
  margin: 20px;
}
.context{
  margin: 40px;
}
.movie-info {
  text-align: left;
  color: grey;
}
</style>
