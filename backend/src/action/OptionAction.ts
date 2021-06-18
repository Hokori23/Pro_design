import { Option } from '@models'
import { Transaction } from 'sequelize/types'
import { Op, QueryTypes } from 'sequelize'
import { OptionAttribute } from '@models/Option'
import config from '@config'

import sequelize from '@database'
const { captchaExpiredTime, host, blogName } = config

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
 * 批量添加设置字段（重复字段更新）
 * @param { Option[] } arr
 * @param { Transaction } t?
 */
const CreateBulk__Update = async (
  arr: Option[],
  t?: Transaction,
): Promise<Option[]> => {
  return await Option.bulkCreate(arr, {
    validate: true,
    updateOnDuplicate: ['module', 'key', 'value'],
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

/**
 * 初始化系统设置表默认设置
 * @param { string } system_publicPath_$
 * @param { string } system_blogName_$
 * @param { string } email_isActivated_$
 * @param { string } email_expiredTime_$
 */
export const Init = async () => {
  const existedOptions = await Retrieve__All()
  if (existedOptions.length) return
  const options: OptionAttribute[] = [
    {
      module: 'system',
      key: 'publicPath',
      value: host,
    },
    {
      module: 'system',
      key: 'blogName',
      value: blogName,
    },
    {
      module: 'system',
      key: 'createdAt', // 博客创建时间
      value: String(Date.now()),
    },
    {
      module: 'email',
      key: 'isActivated', // 是否开启邮箱系统（但不关闭邮箱注册验证功能）
      value: '1',
    },
    {
      module: 'email',
      key: 'expiredTime',
      value: captchaExpiredTime,
    },
  ]
  await CreateBulk(options as Option[])
}

export interface FormattedOption {
  system: {
    publicPath: string
    blogName: string
  }
  email: {
    isActivated: string
    expiredTime: string
  }
}

export default {
  Create,
  CreateBulk,
  CreateBulk__Update,
  Retrieve,
  Retrieve__All,
  Update,
  Delete,
  Delete__All,
  Init,
}
