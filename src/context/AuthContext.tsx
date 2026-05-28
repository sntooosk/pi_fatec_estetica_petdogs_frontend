import { useState } from "react";
import type {  ReactNode } from "react";
import { LoginRequest, type LoginData, type LoginResponse } from "../services/authService";
import { AuthContext } from "./AuthContextObject";
interface AuthProviderProps {
    children: ReactNode;
}
function getStoredUser():LoginResponse["user"] | null {
  const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return null;
    }
    return JSON.parse(storedUser);
}

function getStoredToken(): string | null {
    return localStorage.getItem("token");
}

export function AuthProvider({ children }: AuthProviderProps) {
    const[user, setUser] = useState<LoginResponse["user"] | null>(getStoredUser());
    const[token, setToken] = useState<string | null>(getStoredToken());

    const isAuthenticated = !!user && !!token;

    async function signIn(data: LoginData): Promise<void> {
        console.log("Dados de login CONTEXTO:", data);
        const response = await LoginRequest(data);
        localStorage.setItem("petshop-token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        console.log("Resposta do login:", response);
        setUser(response.user);
        setToken(response.token);
     }
     function signOut(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setToken(null);
      }
     
      
    return (
        <AuthContext.Provider 
        value={{ user, 
        token,
         isAuthenticated,
          signIn, 
          signOut 
          }}>
            {children}
        </AuthContext.Provider>
    )
}         