import { createDashboardUseCases } from "../../application/use-cases/dashboardUseCases"
import { axiosDashboardRepository } from "../../infrastructure/repositories/axiosDashboardRepository"

export const dashboardController = createDashboardUseCases(axiosDashboardRepository)
