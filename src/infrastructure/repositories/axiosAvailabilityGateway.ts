import type { AvailabilityGateway } from "../../application/ports/availabilityGateway"
import type { DayAvailability, SlotAvailability } from "../../domain/entities"
import apiClient from "../http/apiClient"

export const axiosAvailabilityGateway: AvailabilityGateway = {
  async getMonthAvailability(params) {
    const response = await apiClient.get<{ month: string; days: DayAvailability[] }>("/agendamentos/disponibilidade/mes", { params })
    return response.data.days
  },

  async getDayAvailability(params) {
    const response = await apiClient.get<{ slots: SlotAvailability[]; available: boolean }>("/agendamentos/disponibilidade", { params })
    return response.data
  },
}
