import { defineStore } from "pinia";
import { Movie, MovieSession } from "./types";
import { getCurrentMovieSessions, getMovies } from "./api";
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
            try {               
                this.selectedMovie = this.movies.find(movie => movie.id === id) || null
                this.sessions = await getCurrentMovieSessions(id)
                console.log(`Сеансы фильма ${id}:`, this.sessions)
            } catch (error) {
                const { message } = handleApiError(error)
                this.error = message
            } finally {
                this.loading = false
            }
        }


    }
})