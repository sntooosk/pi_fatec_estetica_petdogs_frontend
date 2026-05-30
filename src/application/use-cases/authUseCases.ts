import type { AuthRepository } from "../ports/authRepository"
import type { SessionStorage } from "../ports/sessionStorage"
import type { AuthSession, LoginCredentials, RegisterCustomerData } from "../../domain/entities"

export function createAuthUseCases(repository: AuthRepository, storage: SessionStorage) {
  return {
    getStoredSession(): AuthSession | null {
      return storage.getSession()
    },

    hasValidSession(): boolean {
      return Boolean(storage.getToken())
    },

    async signIn(credentials: LoginCredentials): Promise<AuthSession> {
      const session = await repository.login(credentials)
      storage.saveSession(session)
      return session
    },

    async registerCustomer(data: RegisterCustomerData): Promise<AuthSession> {
      const session = await repository.registerCustomer(data)
      storage.saveSession(session)
      return session
    },

    signOut(): void {
      storage.clearSession()
    },
  }
}
