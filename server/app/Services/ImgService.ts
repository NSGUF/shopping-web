import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Application from '@ioc:Adonis/Core/Application'

interface CreateImg {
  file?: MultipartFileContract
}

async function upload(payload: CreateImg) {
  if (payload.file) {
    await payload.file.moveToDisk(Application.tmpPath('uploads'))
    return `/api/uploads/${payload.file.fileName}`
  }
}
export default { upload }
