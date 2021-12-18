import Application from '@ioc:Adonis/Core/Application'
import ImgInterface, { CreateImg } from 'Contracts/interfaces/img.interface'
import Singleton from 'Contracts/singleton'

export default class ImgService extends Singleton implements ImgInterface {
  public async upload(payload: CreateImg) {
    if (payload.file) {
      await payload.file.moveToDisk(Application.tmpPath('uploads'))
      return `/api/uploads/${payload.file.fileName}`
    }
    return false
  }
}
