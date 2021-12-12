import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateUserValidator } from 'App/Validators/UserValidators'
import UserService from 'App/Services/UserService'
import { DEFAULT_JSON } from 'App/const'

export default class SignupController {
  public async submitSignup({ request }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)
    await UserService.create(payload)

    return {
      ...DEFAULT_JSON,
      data: {
        success: true,
      },
    }
  }
}
