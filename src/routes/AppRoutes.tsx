import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"
import { UnauthorizedPage } from "../pages/UnauthorizedPage"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app/*" element={<PrivateRoutes />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
