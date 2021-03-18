import { Group } from '@models/User'
import { User } from 'models'

/**
 * 添加用户
 * @param { User } user
 */
const Create = async (user: User): Promise<User> => {
  return await user.save()
}

/**
 * 获取超级管理员
 */
const Retrieve__Super_Admin = async (): Promise<User | null> => {
  return await User.findOne({
    where: {
      group: Group.SUPER_ADMIN,
    },
  })
}

/**
 * 通过某个字段查询单个用户
 * @param { string } param
 * @param { string } value
 */
const Retrieve = async (
  key: string,
  value: string | number,
): Promise<User | null> => {
  return await User.findOne({
    where: {
      [`${key}`]: value,
    },
  })
}

/**
 * 通过某个字段查询单个用户（不含密码）
 * @param { string } param
 * @param { string } value
 */
const Retrieve__Safely = async (
  key: string,
  value: string | number,
): Promise<User | null> => {
  return await User.findOne({
    attributes: {
      exclude: ['password'],
    },
    where: {
      [`${key}`]: value,
    },
  })
}

/**
 * 遍历用户（不含密码）
 */
const Retrieve__All__Safely = async (): Promise<User[]> => {
  return await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  })
}

/**
 * 更新用户信息
 * @param { User } oldUser
 * @param { User } newUser
 */
const Update = async (oldUser: User, newUser: User): Promise<User> => {
  return await Object.assign(oldUser, newUser).save()
}

/**
 * 删除用户账号
 * @param { number } id
 */
const Delete = async (id: number): Promise<number> => {
  return await User.destroy({
    where: {
      id,
    },
  })
}

export default {
  Create,
  Retrieve__Super_Admin,
  Retrieve,
  Retrieve__Safely,
  Retrieve__All__Safely,
  Update,
  Delete,
}
