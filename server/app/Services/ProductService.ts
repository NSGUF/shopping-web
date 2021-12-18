import Product from 'App/Models/Product'
import ProductInterface, { CreateProduct } from 'Contracts/interfaces/product.interface'
import Singleton from 'Contracts/singleton'

export default class ProductService extends Singleton implements ProductInterface {
  public async create(payload: CreateProduct) {
    const product = new Product()
    product.title = payload.title.trim()
    product.detail = payload.detail.trim()
    product.price = payload.price
    product.total = payload.total
    product.picture = payload.picture

    const productSaved = await product.save()
    return productSaved
  }
}
