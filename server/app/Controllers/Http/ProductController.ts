import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateProductValidator } from 'App/Validators/ProductValidators'
import { BuyValidator } from 'App/Validators/BuyValidators'
import ProductService from 'App/Services/ProductService'
import { DEFAULT_JSON, LIST_JSON, UNAUTH_JSON, ERROR_JSON } from 'App/const'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'
import { loggerInfo } from 'App/logger'
import BuyService from 'App/Services/BuyService'

export default class ProductController {
  private table = 'products'
  private model = Product
  private service = ProductService

  public async add({ request, session }: HttpContextContract) {
    const user = session.get('user')
    if (!user) {
      return UNAUTH_JSON
    }
    const payload = await request.validate(CreateProductValidator)
    let product = await this.service.create(payload)

    loggerInfo(user.id, ' add product ', product.id)
    return {
      ...DEFAULT_JSON,
      data: {
        success: true,
      },
    }
  }
  public async get({ request, session }: HttpContextContract) {
    const user = session.get('user')
    if (!user) {
      return UNAUTH_JSON
    }
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const keyword = '%' + request.input('keyword', '') + '%'
    const res = await Database.from(this.table)
      .where('title', 'like', keyword)
      .orWhere('detail', 'like', keyword)
      .paginate(page, limit)
    const resJson = res.toJSON()

    return {
      ...LIST_JSON,
      data: {
        items: resJson.data,
        total: resJson.meta.total,
      },
    }
  }
  public async buy({ request, session }: HttpContextContract) {
    const user = session.get('user')
    if (!user) {
      return UNAUTH_JSON
    }
    let id = request.input('id')
    loggerInfo(user.id, 'buy', id)
    await request.validate(BuyValidator)
    const product = await this.model.findOrFail(id)
    if (!product) {
      loggerInfo(user.id, 'buy but unexit', id)
      return {
        ...ERROR_JSON,
        message: '购买的商品不存在',
      }
    }
    if (!product.total) {
      loggerInfo(user.id, 'buy total is 0', id)
      return {
        ...ERROR_JSON,
        message: '购买的商品没有库存',
      }
    }
    product.total--
    product.save()
    let buy = await BuyService.buy({
      userId: user.id,
      count: 1,
      productId: product.id,
    })
    console.log(buy)
    loggerInfo(user.id, 'buy success', id)
    return DEFAULT_JSON
  }
}
