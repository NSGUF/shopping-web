import { RoleType } from 'App/const'
import User from 'App/Models/User'

export interface CreateUserPayload {
  phone: string
  password: string
  password_confirm: string
  role?: RoleType
}
export default interface UserInterface {
  create(payload: CreateUserPayload): Promise<User>
}
