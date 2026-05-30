import type { AuthRepository } from "../../application/ports/authRepository"
import type { AuthSession, LoginCredentials, RegisterCustomerData } from "../../domain/entities"
import apiClient from "../http/apiClient"

interface MeResponse {
  user: AuthSession["user"]
}

export const axiosAuthRepository: AuthRepository = {
  async login(credentials: LoginCredentials) {
    const response = await apiClient.post<AuthSession>("/auth/login", credentials)
    return response.data
  },

  async registerCustomer(data: RegisterCustomerData) {
    const response = await apiClient.post<AuthSession>("/auth/register", data)
    return response.data
  },

  async me() {
    const response = await apiClient.get<MeResponse>("/auth/me")
    return response.data.user
  },
}
