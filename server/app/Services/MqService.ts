import MqInterface from 'Contracts/interfaces/mq.interface'
import { menash } from 'menashmq';

export default class MqService implements MqInterface {
  constructor() {
    this.initMq();
  }
  
  async initMq() {
    await menash.connect('amqp://localhost');
    await menash.declareQueue('my-queue', { durable: true });
  }

  async buy(userId: number, productId: number) {
    await menash.send('my-queue', { userId, productId});
  }
}
