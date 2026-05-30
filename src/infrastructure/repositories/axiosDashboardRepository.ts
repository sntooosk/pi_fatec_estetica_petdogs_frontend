import type { DashboardRepository } from "../../application/ports/dashboardRepository"
import type { AuthUser, Customer, Pet, Professional, Schedule, Service } from "../../domain/entities"
import apiClient from "../http/apiClient"

export const axiosDashboardRepository: DashboardRepository = {
  async getMe() {
    const response = await apiClient.get<{ user: AuthUser }>("/auth/me")
    return response.data.user
  },

  async listPets() {
    const response = await apiClient.get<Pet[]>("/pets")
    return response.data
  },

  async listServices() {
    const response = await apiClient.get<Service[]>("/servicos")
    return response.data
  },

  async listProfessionals() {
    const response = await apiClient.get<Professional[]>("/profissionais")
    return response.data
  },

  async listCustomers() {
    const response = await apiClient.get<Customer[]>("/clientes")
    return response.data
  },

  async listSchedules() {
    const response = await apiClient.get<Schedule[]>("/agendamentos")
    return response.data
  },

  async getCustomerProfile() {
    const response = await apiClient.get<Customer>("/clientes/me")
    return response.data
  },

  async savePet(payload, id) {
    if (id) {
      await apiClient.put(`/pets/${id}`, payload)
      return
    }

    await apiClient.post("/pets", payload)
  },

  async saveService(payload, id) {
    if (id) {
      await apiClient.put(`/servicos/${id}`, payload)
      return
    }

    await apiClient.post("/servicos", payload)
  },

  async saveProfessional(payload, id) {
    if (id) {
      await apiClient.put(`/profissionais/${id}`, payload)
      return
    }

    await apiClient.post("/profissionais", payload)
  },

  async saveCustomer(payload, id) {
    if (id) {
      await apiClient.put(`/clientes/${id}`, payload)
      return
    }

    await apiClient.post("/clientes", payload)
  },

  async saveSchedule(payload, id) {
    if (id) {
      await apiClient.put(`/agendamentos/${id}`, payload)
      return
    }

    await apiClient.post("/agendamentos", payload)
  },

  async updateCustomerProfile(payload) {
    await apiClient.put("/clientes/me", payload)
  },

  async updateProfessionalProfile(payload) {
    await apiClient.put("/profissionais/me", payload)
  },

  async remove(path) {
    await apiClient.delete(path)
  },

  async cancelSchedule(id) {
    await apiClient.patch(`/agendamentos/${id}/cancel`)
  },
}
