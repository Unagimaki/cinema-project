import { defineStore } from "pinia";
import { Movie, MovieSession } from "./types";
import { getMovies, getMoviesSessions } from "./api";
import { handleApiError } from "@/shared/api/handleApiError";

export const useMovieStore = defineStore("MoviesStore", {
    state: () => ({
        movies: [] as Movie[],
        selectedMovie: null as Movie | null,
        sessions: [] as MovieSession[],
        loading: false,
        error: ''
    }),
    actions: {
        async fetchMovies() {
            this.loading = true;
            this.error = '';
            try {
                this.movies = await getMovies()
            } catch (error) {
                const {message} = handleApiError(error);
                this.error = message;
            }
            finally {
                this.loading = false;
            }
        },

        async fetchMoviesSessionById(id: number) {
            this.loading = true;
            this.error = '';
            try {
                this.sessions = await getMoviesSessions(id)
                this.selectedMovie = this.movies.find(movie => movie.id === id) || null
                console.log(this.sessions);
                
            } catch (error) {
                const {message} = handleApiError(error);
                this.error = message;
            } finally {
                this.loading = false;
            }
        }

    }
})