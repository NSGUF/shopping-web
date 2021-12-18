/**
 * controller的配置
 */

export const SERVICE = {
  MqService: 'MqService',
  BuyService: 'BuyService',
  ProductService: 'ProductService',
  UserService: 'UserService',
  ImgService: 'ImgService',
}

/**
 * 通过配置绑定controller和service
 */
export const CONTROLLERS = {
  SignupController: {
    constructor: 'SignupController',
    services: [SERVICE.UserService],
  },
  SigninController: {
    constructor: 'SigninController',
  },
  ProductController: {
    constructor: 'ProductController',
    services: [SERVICE.ProductService, SERVICE.BuyService, SERVICE.MqService],
  },
  ImgController: {
    constructor: 'ImgController',
    services: [SERVICE.ImgService],
  },
}
