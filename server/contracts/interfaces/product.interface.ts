import Product from 'App/Models/Product'
export interface CreateProduct {
  title: string
  detail: string
  price: number
  total: number
  picture: string
}
export default interface ProductInterface {
  create(payload: CreateProduct): Promise<Product>
}
