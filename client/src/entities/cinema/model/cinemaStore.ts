import { defineStore } from "pinia"
import { Cinema } from "./types"
import { getCinemas } from "./api"
import { handleApiError } from "@/shared/api/handleApiError"

export const useCinemaStore = defineStore("CinemaStore", {
    state: () => ({
        cinemas: [] as Cinema[],
        loading: false,
        error: ''
    }),
    actions: {
        async fetchCinemas() {
            if (this.cinemas.length) return
            this.loading = true
            try {
                this.cinemas = await getCinemas()
                console.log(this.cinemas)                
            } catch (error) {
                const { message } = handleApiError(error)
                this.error = message
            } finally {
                this.loading = false
            }
        }
    }
})