<template>
  <el-card class="father">
    <div><img :src="movie.posterUrl" class="image"></div>
    <div class="movie">
      <div class="title">{{movie.name}}</div>
      <div class="status">{{movie.status}}</div>
      <div class="islike">{{movie.islike}}</div>
      <div class="likeCount">{{movie.likeCount}}</div>
      <div class="description">
        <span class="overflow">{{ movie.description.length > 100 ? movie.description.slice(0, 100) + '...' : movie.description }}</span>
        </div>
      <div class="starring">{{movie.starring}}</div>
      <div class="type">{{movie.type}}</div>
      <div class="director">{{movie.director}}</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'MovieInformation',
  props: {
    movie: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  div {
    margin: 3px 0;
  }
  .father {
    position: relative;
  }
  .movie {
    height: 100%;
  }
  .footer {
    position: absolute;
    bottom: 1%;
  }
  .width {
    width: 50%;
  }
  .image {
    width: 100%;
    display: block;
  }
  .el-card {
    width:100%;
    height:100%;
  }
  .description {
    font-family: monospace;
    width: 100%;
    color: grey;
    height: 100%;
  }
  .overflow {
    overflow-y: hidden;
    text-overflow: ellipsis;
  }
  .title {
    font-family:"微软雅黑";
  }
</style>
