import { api } from "@/shared/api/base";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { Movie, MovieSession } from "./types";

export async function getMovies(): Promise<Movie[]> {
    const {data} = await api.get<Movie[]>(API_ENDPOINTS.MOVIES.ROOT);
    return data;
}
export async function getCurrentMovieSessions(movieId: number): Promise<MovieSession[]> {
    const {data} = await api.get<MovieSession[]>(API_ENDPOINTS.MOVIES.THIS_MOVIE_SESSIONS_BY_ID(movieId),);
    return data;
}
