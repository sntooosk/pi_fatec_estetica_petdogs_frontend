import { createContext } from "react"
import type { AuthSession, LoginCredentials } from "../domain/entities"

interface AuthContextData {
  user: AuthSession["user"] | null
  token: string | null
  isAuthenticated: boolean
  signIn: (data: LoginCredentials) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)
