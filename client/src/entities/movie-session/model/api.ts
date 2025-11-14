import { api } from "@/shared/api/base";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { MovieSession } from "./types";

export async function getMovieSession(movieSessionsId: number): Promise<MovieSession> {
    const {data} = await api.get(API_ENDPOINTS.MOVIES_SESSIONS.MOVIE_SESSION_BY_MOVIE_SESSION_ID(movieSessionsId))
    return data;
}