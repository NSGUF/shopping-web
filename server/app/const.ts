export enum RoleType {
  member = 'member',
  admin = 'admin',
}

export const RoleIdList = [RoleType.member, RoleType.admin]

export const DEFAULT_JSON = {
  code: 200,
  message: '操作成功',
  data: {
    success: true,
  },
}
export const LIST_JSON = {
  code: 200,
  message: '成功',
  data: {
    total: 0,
    items: [],
  },
}
export const ERROR_JSON = {
  code: 0,
  message: '接口错误',
  data: null,
}
export const UNAUTH_JSON = {
  code: 401,
  message: '请先登陆',
  data: null,
}
