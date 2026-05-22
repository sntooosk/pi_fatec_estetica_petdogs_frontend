import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface ProtectedRoutesProps {
  children: ReactNode
}

export function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const token = localStorage.getItem("petshop-token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
