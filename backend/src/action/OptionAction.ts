import { Option } from '@models'
import { Transaction } from 'sequelize/types'
import { Op, QueryTypes } from 'sequelize'

import sequelize from '@database'

/**
 * 添加设置字段
 * @param { Option } option
 * @param { Transaction } t?
 */
const Create = async (option: Option, t?: Transaction): Promise<Option> => {
  return await option.save({
    transaction: t,
  })
}

/**
 * 批量添加设置字段
 * @param { Option[] } arr
 * @param { Transaction } t?
 */
const CreateBulk = async (
  arr: Option[],
  t?: Transaction,
): Promise<Option[]> => {
  return await Option.bulkCreate(arr, {
    validate: true,
    transaction: t,
  })
}

/**
 * 查询重复模块
 * @param { Option } option
 */
const Retrieve = async (options: Option[]): Promise<Option[]> => {
  return await Option.findAll({
    where: {
      [Op.or]: options.map((option) => ({
        module: option.module,
        id: option.key,
      })),
    },
  })
}

/**
 * 查询全部
 */
const Retrieve__All = async (): Promise<Option[]> => {
  return await Option.findAll()
}

/**
 * 修改
 */
const Update = async (
  oldOption: Option,
  newOption: Option,
  t?: Transaction,
): Promise<Option> => {
  return await Object.assign(oldOption, newOption).save({
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

/**
 * 删除所有字段
 * @param { Transaction } t?
 */
const Delete__All = async (t?: Transaction): Promise<void> => {
  await sequelize.query(`DELETE FROM ${Option.getTableName() as string}`, {
    type: QueryTypes.DELETE,
    transaction: t,
  })
}

export default {
  Create,
  CreateBulk,
  Retrieve,
  Retrieve__All,
  Update,
  Delete,
  Delete__All,
}
