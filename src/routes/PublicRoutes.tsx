import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/auth/LoginPage"
import { LandingPage } from "../pages/landing/LandingPage"

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage mode="register" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
