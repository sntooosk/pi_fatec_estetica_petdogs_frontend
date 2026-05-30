import type { AuthSession, LoginCredentials, RegisterCustomerData } from "../../domain/entities"

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<AuthSession>
  registerCustomer(data: RegisterCustomerData): Promise<AuthSession>
  me(): Promise<AuthSession["user"]>
}
