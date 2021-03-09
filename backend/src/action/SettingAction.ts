import { Setting } from '@models'
import { Transaction } from 'sequelize/types'

/**
 * 添加设置字段
 * @param { Setting } setting
 */
const Create = async (setting: Setting) => {
  return await setting.save()
}

/**
 * 查询全部
 */
const Retrieve__All = async () => {
  return await Setting.findAll()
}

/**
 * 修改
 */
const Update = async (oldSetting: Setting, newSetting: Setting) => {
  return await Object.assign(oldSetting, newSetting).save()
}

/**
 * 批量添加设置字段
 * @param { any[] } arr
 */
const CreateBulk = async (arr: any[], t?: Transaction) => {
  return await Setting.bulkCreate(arr, {
    validate: true,
    transaction: t,
  })
}

/**
 * 删除设置字段
 * @param { number } id
 */
const Delete = async (id: number): Promise<number> => {
  return await Setting.destroy({
    where: {
      id,
    },
  })
}

export default {
  Create,
  CreateBulk,
  Delete,
  Retrieve__All,
  Update,
}
