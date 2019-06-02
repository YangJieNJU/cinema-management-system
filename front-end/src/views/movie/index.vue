<template>
  <div>
    <movie-card v-for="movie in movies" :key="movie.id" :movie="movie"></movie-card>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard'
import { getAll } from '@/api/movie'

export default {
  components: {
    'movie-card': MovieCard
  },
  data() {
    return {
      movies: []
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
    }
  }
}
</script>
