import type { AuthUser, Customer, DashboardData, Professional } from "../../domain/entities"
import type {
  CustomerPayload,
  DashboardRepository,
  PetPayload,
  ProfessionalPayload,
  ProfilePayload,
  SchedulePayload,
  ServicePayload,
} from "../ports/dashboardRepository"

function findProfessionalProfile(user: AuthUser, professionals: Professional[]): Professional | undefined {
  return professionals.find((item) => item._id === user.id)
}

export function createDashboardUseCases(repository: DashboardRepository) {
  return {
    async loadDashboard(): Promise<DashboardData> {
      const user = await repository.getMe()
      const [services, professionals, schedules] = await Promise.all([
        repository.listServices(),
        repository.listProfessionals(),
        repository.listSchedules(),
      ])

      const [pets, customers, customerProfile] = await Promise.all([
        user.role === "cliente" || user.role === "admin" ? repository.listPets() : Promise.resolve([]),
        user.role === "admin" ? repository.listCustomers() : Promise.resolve([]),
        user.role === "cliente" ? repository.getCustomerProfile() : Promise.resolve<Customer | undefined>(undefined),
      ])

      return {
        user,
        pets,
        services,
        professionals,
        customers,
        schedules,
        profile: user.role === "profissional" ? findProfessionalProfile(user, professionals) : customerProfile,
      }
    },

    savePet(payload: PetPayload, id?: string | null) {
      return repository.savePet(payload, id)
    },

    saveService(payload: ServicePayload, id?: string | null) {
      return repository.saveService(payload, id)
    },

    saveProfessional(payload: ProfessionalPayload, id?: string | null) {
      return repository.saveProfessional(payload, id)
    },

    saveCustomer(payload: CustomerPayload, id?: string | null) {
      return repository.saveCustomer(payload, id)
    },

    saveSchedule(payload: SchedulePayload, id?: string | null) {
      return repository.saveSchedule(payload, id)
    },

    updateProfile(role: AuthUser["role"], payload: ProfilePayload) {
      if (role === "profissional") {
        return repository.updateProfessionalProfile(payload)
      }

      return repository.updateCustomerProfile(payload)
    },

    removeResource(path: string) {
      return repository.remove(path)
    },

    cancelSchedule(id: string) {
      return repository.cancelSchedule(id)
    },
  }
}
