<template>
  <h1>这部电影的ID：{{ movieId }}</h1>
</template>

<script>
export default {
  computed: {
    movieId: function() {
      return this.$route.query.movieId
    }
  }
}
</script>

