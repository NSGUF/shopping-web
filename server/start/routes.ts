/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CONTROLLERS } from 'App/config'
import Singleton from 'Contracts/singleton'

const SERVICE_INS = {}
const CONTROLLERS_INS = {}

const router = [
  {
    url: '/api/signup',
    method: 'post',
    controller: 'SignupController.submitSignup',
  },
  {
    url: '/api/signin',
    method: 'post',
    controller: 'SigninController.signin',
  },
  {
    url: '/api/logout',
    method: 'post',
    controller: 'SigninController.logout',
  },
  {
    url: '/api/product',
    method: 'post',
    controller: 'ProductController.add',
  },
  {
    url: '/api/buy',
    method: 'post',
    controller: 'ProductController.buy',
  },
  {
    url: '/api/product',
    method: 'get',
    controller: 'ProductController.get',
  },
  {
    url: '/api/img',
    method: 'post',
    controller: 'ImgController.add',
  },
  {
    url: '/api/uploads/*',
    method: 'get',
    controller: 'ImgController.get',
  },
]

/**
 * 获取到controller对应的service实例
 * @param clsName
 */
async function getService(clsName: string) {
  let services: Singleton[] = []
  if (CONTROLLERS[clsName]?.services) {
    for (const item of CONTROLLERS[clsName]?.services) {
      if (!SERVICE_INS[item]) {
        const Service = await import(`../app/Services/${item}`)
        if (!Service.default) {
          throw item + ' is not exit'
        }
        SERVICE_INS[item] = Service.default.getInstance()
      }

      services.push(SERVICE_INS[item])
    }
  }

  return services
}

/**
 * 获取对应controller的实例
 * @param clsName
 */
async function getController(clsName: string) {
  if (!CONTROLLERS_INS[clsName]) {
    let cls = await import(`App/Controllers/Http/${clsName}`)
    if (!cls.default) {
      throw clsName + ' is not exit'
    }
    let services = await getService(clsName)
    CONTROLLERS_INS[clsName] = new cls.default(...services)
  }

  return CONTROLLERS_INS[clsName]
}

router.forEach((item) => {
  Route[item.method](item.url, async (ctx: HttpContextContract) => {
    let con = item.controller.split('.')
    if (con.length !== 2) {
      throw item.controller + ' is wrong'
    }
    const [clsName, fn] = con
    let clsIns = await getController(clsName)
    return await clsIns[fn](ctx)
  })
})
