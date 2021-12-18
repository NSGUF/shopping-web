import User from 'App/Models/User'
import { RoleType } from 'App/const'
import { CreateUserPayload } from 'Contracts/interfaces/user.interface'
import Singleton from 'Contracts/singleton'

export default class UserService extends Singleton {
  public async create(payload: CreateUserPayload) {
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
}
