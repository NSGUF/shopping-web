export enum RoleType {
  member = 'member',
  admin = 'admin',
}

export const RoleOptions = [
  {
    value: RoleType.member,
    label: '普通用户'
  },
  {
    value: RoleType.admin,
    label: '管理员'
  }
]
