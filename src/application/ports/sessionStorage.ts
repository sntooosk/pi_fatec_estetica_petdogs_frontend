import type { AuthSession } from "../../domain/entities"

export interface SessionStorage {
  getSession(): AuthSession | null
  saveSession(session: AuthSession): void
  clearSession(): void
  getToken(): string | null
}
