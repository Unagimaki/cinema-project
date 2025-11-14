import { defineStore } from "pinia";
import { getSettings } from "../api/getSettings";
import { handleApiError } from "@/shared/api/handleApiError";
import { PaymentSettings } from "../types";

export const useSeekSettingsStore = defineStore('PaymentsSettingStore', {
    state: () => ({
        loading: false,
        error: '',
        settings: null as PaymentSettings | null,
    }),
    actions: {
        async fetchSettings() {
            this.loading = true;
            this.error = '';
            try {
                const data = await getSettings()
                console.log(data);
                this.settings = data
            } catch (e) {
                const { message } = handleApiError(e)
                this.error = message
            } finally {
                this.loading = false
            }
        }
    }
})