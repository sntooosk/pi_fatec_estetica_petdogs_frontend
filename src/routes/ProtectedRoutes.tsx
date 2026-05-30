import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { authController } from "../interface-adapters/controllers/authController"

interface ProtectedRoutesProps {
  children: ReactNode
}

export function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  if (!authController.hasValidSession()) {
    return <Navigate to="/login" replace />
  }

  return children
}
