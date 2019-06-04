<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="选择座位"></el-step>
      <el-step title="确认订单"></el-step>
      <el-step title="支付成功"></el-step>
    </el-steps>
    <router-view :key="key" />
  </div>
</template>

<script>
export default {
  name: 'Payment',
  computed: {
    key() {
      return this.$route.fullPath
    },
    active() {
      if (this.$route.path === '/movie/payment/seat') {
        return 1
      } else if (this.$route.path === '/movie/payment/order') {
        return 2
      } else { return 3 }
    }
  },
  methods: {

  }
}
</script>

