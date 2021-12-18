import Buy from 'App/Models/Buy'
export interface CreateBuy {
  userId: number
  productId: number
  count: number
}
export default interface BuyInterface {
  buy(payload: CreateBuy): Promise<Buy>
}
