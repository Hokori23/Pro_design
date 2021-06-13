import config from 'proj.config'
import { Sequelize } from 'sequelize'
import { isDev } from '@utils/const'

const { dataBaseConfig } = config

const { database, user, password, options } = dataBaseConfig

const sequelize = new Sequelize(database, user, password, {
  ...options,
  // eslint-disable-next-line no-console
  logging: isDev ? console.log : false, // 是否输出数据库日志
})
export const init = async () => {
  // TODO: 线上环境删除force
  await sequelize.sync({ force: true })
}
export const authenticate = async () => {
  return await sequelize.authenticate()
}
export default sequelize
