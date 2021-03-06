/**
 * 单例模式
 */
export default class Singleton {
  public static getInstance<T extends {}>(this: new () => T): T {
    if (!(<any>this).instance) {
      ;(<any>this).instance = new this()
    }
    return (<any>this).instance
  }
}
