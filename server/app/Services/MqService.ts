import MqInterface from 'Contracts/interfaces/mq.interface'
import { menash } from 'menashmq'
import Singleton from 'Contracts/singleton'

export default class MqService extends Singleton implements MqInterface {
  constructor() {
    super()
    this.initMq()
  }

  public async initMq() {
    await menash.connect('amqp://localhost')
    await menash.declareQueue('my-queue', { durable: true })
  }

  public async buy(userId: number, productId: number) {
    await menash.send('my-queue', { userId, productId })
  }
}
