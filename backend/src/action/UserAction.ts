import { Group } from '@models/User'
import { md5Crypto } from '@utils'
import { Mail, User } from 'models'
import { Transaction } from 'sequelize/types'

/**
 * 添加游客用户
 * @param { User } user
 * @param { Transaction } t?
 */
export const _Create = async (t?: Transaction) => {
  const _user: User = User.build({
    id: 0,
    userAccount: 'visitor',
    userName: 'visitor',
    password: md5Crypto('visitor'),
    email: 'visitor@example.com',
  })
  return await User.create(_user.toJSON(), {
    transaction: t,
  })
}

/**
 * 添加用户
 * @param { User } user
 * @param { Transaction } t?
 */
const Create = async (user: User, t?: Transaction): Promise<User> => {
  return await user.save({ transaction: t })
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
 * 遍历已订阅用户
 */
const Retrieve__All__Subscribed = async (): Promise<User[]> => {
  return await User.findAll({
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: Mail,
        as: 'mail',
        where: {
          isSubscribed: true,
        },
      },
    ],
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
  Retrieve__All__Subscribed,
  Update,
  Delete,
}
