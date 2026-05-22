import { Navigate, Route, Routes } from "react-router-dom"
import { Dashboard } from "../pages/dashboad/Dashboard"
import { ProtectedRoutes } from "./ProtectedRoutes"

export function PrivateRoutes() {
  return (
    <ProtectedRoutes>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </ProtectedRoutes>
  )
}
