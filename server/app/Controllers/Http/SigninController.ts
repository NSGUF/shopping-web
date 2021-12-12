import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { InvalidCredentialsException } from '@adonisjs/auth/build/src/Exceptions/InvalidCredentialsException'
import User from 'App/Models/User'
import { DEFAULT_JSON, ERROR_JSON } from 'App/const'
import { loggerInfo } from 'App/logger'

export default class SigninController {
  public async signin({ request, session, auth }: HttpContextContract) {
    let user = await auth
      .use('web')
      .attempt(request.input('phone'), request.input('password'))
      .catch((e: InvalidCredentialsException) => {
        console.log(e)
        return {
          ...ERROR_JSON,
          message: e.responseText,
        }
      })
    if (user instanceof User) {
      session.put('user', user)
      return {
        ...DEFAULT_JSON,
        data: {
          role: user.role,
        },
      }
    }
    loggerInfo(user.id, ' login ')
    return user
  }

  public async logout({ auth, session }: HttpContextContract) {
    await auth.use('web').logout()
    loggerInfo(session.get('user').id, ' logout ')
    session.flashAll()
    return DEFAULT_JSON
  }
}
