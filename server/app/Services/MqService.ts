import MqInterface from 'Contracts/interfaces/mq.interface'

export default class MqService implements MqInterface {
  buy (userId: number, productId: number): void {
    console.log(userId, ' action ', productId);
  }
}
