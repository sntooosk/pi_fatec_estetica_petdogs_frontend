import { createAvailabilityUseCases } from "../../application/use-cases/availabilityUseCases"
import { axiosAvailabilityGateway } from "../../infrastructure/repositories/axiosAvailabilityGateway"

export const availabilityController = createAvailabilityUseCases(axiosAvailabilityGateway)
