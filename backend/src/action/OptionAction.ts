import { Option } from '@models'
import { Transaction } from 'sequelize/types'

/**
 * 添加设置字段
 * @param { Option } option
 */
const Create = async (option: Option) => {
  return await option.save()
}

/**
 * 查询全部
 */
const Retrieve__All = async () => {
  return await Option.findAll()
}

/**
 * 修改
 */
const Update = async (oldOption: Option, newOption: Option) => {
  return await Object.assign(oldOption, newOption).save()
}

/**
 * 批量添加设置字段
 * @param { any[] } arr
 */
const CreateBulk = async (arr: any[], t?: Transaction) => {
  return await Option.bulkCreate(arr, {
    validate: true,
    transaction: t,
  })
}

/**
 * 删除设置字段
 * @param { number } id
 */
const Delete = async (id: number): Promise<number> => {
  return await Option.destroy({
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
