import { api } from "@/shared/api/base";
import { AuthResponse, LoginPayload } from "../types";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export async function register(params: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post(API_ENDPOINTS.AUTH.REGISTER, params)
    return data
}
export async function login(params: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post(API_ENDPOINTS.AUTH.LOGIN, params)
    return data
}