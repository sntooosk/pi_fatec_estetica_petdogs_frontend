import { createAuthUseCases } from "../../application/use-cases/authUseCases"
import { axiosAuthRepository } from "../../infrastructure/repositories/axiosAuthRepository"
import { browserSessionStorage } from "../../infrastructure/storage/browserSessionStorage"

export const authController = createAuthUseCases(axiosAuthRepository, browserSessionStorage)
