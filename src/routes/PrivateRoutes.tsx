import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardPage } from "../pages/dashboard/DashboardPage"
import { ProtectedRoutes } from "./ProtectedRoutes"

export function PrivateRoutes() {
  return (
    <ProtectedRoutes>
      <Routes>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </ProtectedRoutes>
  )
}
