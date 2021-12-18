import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

export interface CreateImg {
  file?: MultipartFileContract
}
export default interface ImgInterface {
  upload(payload: CreateImg): Promise<string | boolean>
}
