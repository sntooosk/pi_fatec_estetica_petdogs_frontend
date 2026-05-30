import type { AvailabilityGateway } from "../ports/availabilityGateway"

export function createAvailabilityUseCases(gateway: AvailabilityGateway) {
  return {
    getMonthAvailability: gateway.getMonthAvailability.bind(gateway),
    getDayAvailability: gateway.getDayAvailability.bind(gateway),
  }
}
