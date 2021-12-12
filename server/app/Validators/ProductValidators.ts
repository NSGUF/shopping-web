import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

function customMessages() {
  return {
    'title.required': '手机号必须输入',
    'detail.required': '详情必须输入',
    'price.required': '价格必须输入',
    'total.required': '库存必须输入',
    'picture.unique': '图片必须输入',
  }
}

export class CreateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }),
    detail: schema.string({ trim: true }),
    price: schema.number(),
    total: schema.number(),
    picture: schema.string({ trim: true }),
  })

  public messages = customMessages()
}
