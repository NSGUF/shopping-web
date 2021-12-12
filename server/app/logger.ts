import Logger from '@ioc:Adonis/Core/Logger'

export function loggerInfo(userId: string | number, action: string, objId?: string | number) {
  Logger.info(`info：${userId} ${action} ${objId}`)
}
