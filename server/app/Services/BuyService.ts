import Buy from 'App/Models/Buy'
import BuyInterface from 'Contracts/interfaces/buy.interface'
import Singleton from 'Contracts/singleton'

interface CreateBuy {
  userId: number
  productId: number
  count: number
}

export default class BuyService extends Singleton implements BuyInterface {
  public async buy(payload: CreateBuy) {
    const buy = new Buy()
    buy.userId = payload.userId
    buy.productId = payload.productId
    buy.count = payload.count
    const buySaved = await buy.save()
    return buySaved
  }
}
