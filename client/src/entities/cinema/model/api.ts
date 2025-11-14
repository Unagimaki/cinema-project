import { api } from "@/shared/api/base"
import { Cinema } from "./types"

export async function getCinemas(): Promise<Cinema[]> {
  const { data } = await api.get<Cinema[]>('/cinemas')
  return data
}
