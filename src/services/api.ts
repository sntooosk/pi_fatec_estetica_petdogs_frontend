import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api/v1",
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("petshop-token")

  if (token && token.length < 1000) {
    config.headers.Authorization = `Bearer ${token}`
  } else if (token) {
    localStorage.removeItem("petshop-token")
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 431 || error?.response?.status === 401) {
      localStorage.removeItem("petshop-token")
    }

    return Promise.reject(error)
  },
)

export default api
