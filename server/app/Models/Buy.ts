import { DateTime } from 'luxon'
import { column, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Product from './Product'

export default class Buy extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => User)
  public user: HasOne<typeof User>

  public userId: number

  @hasOne(() => Product)
  public product: HasOne<typeof Product>

  public productId: number

  @column()
  public count: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
