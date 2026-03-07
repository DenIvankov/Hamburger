import axios from "axios"
import { hamburgerStore } from "../app/hamburgerStore"

export const axiosInstance = axios.create({
    baseURL: "https://delivery-app-api.sakhdev.ru/"
})

axiosInstance.interceptors.request.use((config) => {
    const token = hamburgerStore.getState().accessToken

    // добавляем token ТОЛЬКО для защищённых API
    const needAuth =
        config.url?.includes("/dispatcher") ||
        config.url?.includes("/customer") ||
        config.url?.includes("/user")

    if (token && needAuth) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
axiosInstance.interceptors.response.use(

    (response) => response,
    (error) => {
        const { logout } = hamburgerStore()
        if (error.response?.status === 401) {
            // если сервер вернул 401 — разлогиниваем пользователя
            logout()
            console.log("Логаут")
            // authStore.getState().logout()
        }

        return Promise.reject(error)
    }
)
