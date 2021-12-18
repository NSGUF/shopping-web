import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateUserValidator } from 'App/Validators/UserValidators'
import { DEFAULT_JSON } from 'App/const'
import UserInterface from 'Contracts/interfaces/user.interface'

export default class SignupController {
  private service: UserInterface
  constructor(service: UserInterface) {
    if (!service) {
      throw service + 'service is not empty'
    }
    this.service = service
  }
  public async submitSignup({ request }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)
    await this.service.create(payload)

    return {
      ...DEFAULT_JSON,
      data: {
        success: true,
      },
    }
  }
}
