import { AuthPersistanceService } from './auth-persistance.service'

export const authPersistanceServiceMock: Partial<AuthPersistanceService> = {
  initialize: () => { return },
}
