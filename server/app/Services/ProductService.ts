import Product from 'App/Models/Product'

interface CreateProduct {
  title: string
  detail: string
  price: number
  total: number
  picture: string
}

async function create(payload: CreateProduct) {
  const product = new Product()
  product.title = payload.title.trim()
  product.detail = payload.detail.trim()
  product.price = payload.price
  product.total = payload.total
  product.picture = payload.picture

  const productSaved = await product.save()
  return productSaved
}
export default { create }
