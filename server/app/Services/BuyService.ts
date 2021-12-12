import Buy from 'App/Models/Buy'

interface CreateBuy {
  userId: number
  productId: number
  count: number
}

async function buy(payload: CreateBuy) {
  const buy = new Buy()
  buy.userId = payload.userId
  buy.productId = payload.productId
  buy.count = payload.count
  const buySaved = await buy.save()
  return buySaved
}
export default { buy }
