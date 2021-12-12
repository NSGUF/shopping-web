import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateImgValidator } from 'App/Validators/ImgValidators'
import ImgService from 'App/Services/ImgService'
import { DEFAULT_JSON, UNAUTH_JSON } from 'App/const'
import Drive from '@ioc:Adonis/Core/Drive'
import { extname } from 'path'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ProductController {
  public async add({ request, session }: HttpContextContract) {
    const user = session.get('user')
    if (!user) {
      return UNAUTH_JSON
    }
    Logger.info('logger：' + user.id + ' upload img ')
    const payload = await request.validate(CreateImgValidator)
    let fileName = await ImgService.upload(payload)
    Logger.info('logger：' + user.id + 'upload img success')
    return {
      ...DEFAULT_JSON,
      data: {
        fileName,
      },
    }
  }

  /**
   * 查看/下载 上传的文件
   * @param request
   * @param response
   */
  public async get({ request, response }: HttpContextContract) {
    const location = request.param('*').join('/')
    const { size } = await Drive.getStats(location)
    response.type(extname(location))
    response.header('content-length', size)
    return response.stream(await Drive.getStream(location))
  }
}
