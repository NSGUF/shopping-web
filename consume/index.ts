import { menash, ConsumerMessage } from 'menashmq';

interface BuyInterface {
    userId: number
    productId: number
}

await menash.connect('amqp://localhost');
await menash.declareQueue('my-queue', { durable: true });
await menash.queue('my-queue').activateConsumer((msg: ConsumerMessage) => {
    const res = msg.getContent() as BuyInterface;
    console.log('用户 ' + res.userId + ' 购买了商品 ', res.productId);

    msg.ack();
}, { noAck: false });
