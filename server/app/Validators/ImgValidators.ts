import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

function customMessages() {
  return {
    'file.required': '未选择文件',
  }
}
function pictureRules() {
  return {
    size: '5mb',
    extnames: ['jpg', 'gif', 'png', 'webp', 'jpeg'],
  }
}

export class CreateImgValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file.optional(pictureRules()),
  })

  public messages = customMessages()
}
