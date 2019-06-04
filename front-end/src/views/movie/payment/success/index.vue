<template>
  <div style="padding: 5% 20%">
    <h1>支付成功</h1>
    <router-link :to="'/ticket'">
      <el-button type="primary">返回我的电影票</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movieId: null
    }
  },
  created() {
    this.movieId = this.$route.query.movieId
  }
}
</script>
