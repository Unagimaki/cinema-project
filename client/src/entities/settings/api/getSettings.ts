import { api } from "@/shared/api/base";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { PaymentSettings } from "../types";

export async function getSettings(): Promise<PaymentSettings> {
    const {data} = await api.get(API_ENDPOINTS.SETTINGS)
    return data
}