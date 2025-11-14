import { api } from "@/shared/api/base";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export async function getUserBookings() {
    const {data} = await api.get(API_ENDPOINTS.USERS.GET_USERS_BOOKINGS);
    return data;
}
