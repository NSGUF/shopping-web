export default interface MqInterface {
  initMq(): void
  buy(userId: number, productId: number): void
}
