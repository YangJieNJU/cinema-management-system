<template>
  <h1>这部电影：{{ JSON.stringify(movie) }}</h1>
</template>

<script>
import { getMovie } from '@/api/movie'

export default {
  data() {
    return {
      movieId: null,
      userId: null,
      movie: null
    }
  },
  created() {
    this.movieId = this.$route.query.movieId
    this.userId = this.$store.state.user.token
    this.fetchMovie(this.movieId, this.userId)
  },
  methods: {
    fetchMovie: function(movieId, userId) {
      getMovie(movieId, userId).then(response => {
        const { content: movie } = response
        this.movie = movie
      })
    }
  }
}
</script>

