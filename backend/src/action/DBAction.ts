import sequelize from '@database'
import { QueryTypes } from 'sequelize'
import config from '@config'

const GetTableRows = async (): Promise<number> => {
  return (
    await sequelize.query(
      `SELECT count(TABLE_NAME)
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA='${config.dataBaseConfig.database}'`,
      { type: QueryTypes.SELECT },
    )
  )[0]['count(TABLE_NAME)']
}

export default {
  GetTableRows,
}
