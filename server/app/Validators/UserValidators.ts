import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RoleIdList } from 'App/const'

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 10

export function passwordRules(confirm = true) {
  const passwordRules = [rules.minLength(PASSWORD_MIN_LENGTH), rules.maxLength(PASSWORD_MAX_LENGTH)]
  if (confirm) {
    passwordRules.push(rules.confirmed('password_confirm'))
  }
  return passwordRules
}

function customMessages() {
  return {
    'phone.required': '手机号必须输入',
    'phone.unique': '手机号已被注册',
    'password.required': '密码必须输入',
    'password.minLength': '密码最小长度为：' + PASSWORD_MIN_LENGTH,
    'password.maxLength': '密码最大长度为：' + PASSWORD_MAX_LENGTH,
  }
}

export class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'phone' })]),
    password: schema.string({ trim: true }, passwordRules()),
    password_confirm: schema.string({ trim: true }),
    role: schema.enum.optional(RoleIdList),
  })

  public messages = customMessages()
}
