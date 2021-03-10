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

const init = async () => {
  await sequelize.sync({ force: isDev })
}
export { init }
export default sequelize
