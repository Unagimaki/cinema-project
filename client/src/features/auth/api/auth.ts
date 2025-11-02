import { api } from "@/shared/api/base";
import { AuthResponse, LoginPayload } from "../types";

export async function register(params: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post('/register', params)
    return data
}
export async function login(params: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post('/login', params)
    return data
}