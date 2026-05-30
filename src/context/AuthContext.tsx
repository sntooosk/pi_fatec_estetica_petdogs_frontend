import { useState } from "react"
import type { ReactNode } from "react"
import type { AuthSession, LoginCredentials } from "../domain/entities"
import { authController } from "../interface-adapters/controllers/authController"
import { AuthContext } from "./AuthContextObject"

interface AuthProviderProps {
  children: ReactNode
}

const storedSession = authController.getStoredSession()

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthSession["user"] | null>(storedSession?.user ?? null)
  const [token, setToken] = useState<string | null>(storedSession?.token ?? null)

  const isAuthenticated = Boolean(user && token)

  async function signIn(data: LoginCredentials): Promise<void> {
    const response = await authController.signIn(data)
    setUser(response.user)
    setToken(response.token)
  }

  function signOut(): void {
    authController.signOut()
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
