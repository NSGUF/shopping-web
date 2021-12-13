import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import MqService from 'App/Services/MqService';

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.singleton('MyProject/MqService', () => new MqService())
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
