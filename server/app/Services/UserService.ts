import User from 'App/Models/User'
import { RoleType } from 'App/const'

interface CreateUserPayload {
  phone: string
  password: string
  password_confirm: string
  role?: RoleType
}

async function create(payload: CreateUserPayload) {
  const user = new User()
  user.phone = payload.phone
  user.password = payload.password.trim()
  user.role = payload.role || RoleType.member
  if (payload.password && payload.password_confirm) {
    user.password = payload.password.trim()
  }

  const userSaved = await user.save()
  return userSaved
}
export default { create }
