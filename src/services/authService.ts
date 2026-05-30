import type { AuthSession, LoginCredentials } from "../domain/entities"
import { authController } from "../interface-adapters/controllers/authController"

export type LoginData = LoginCredentials
export type LoginResponse = AuthSession

export function LoginRequest(data: LoginData): Promise<LoginResponse> {
  return authController.signIn(data)
}
