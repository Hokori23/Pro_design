import { UserAction as Action } from 'action'
import { User } from 'models'
import { Restful, md5Crypto, isUndef, isDef } from 'utils'
import { CodeDictionary } from '@const'
import Omit from 'omit.js'
import { Group } from '@models/User'

/**
 * 初始化超级管理员
 * @param { User } user
 */
const Init = async (user: User): Promise<Restful> => {
  try {
    const existedUser = await Action.Retrieve__All__Safely()
    if (existedUser.length) {
      return new Restful(
        CodeDictionary.INIT_ERROR__USERACCOUNT_EXISTED,
        '数据库用户表不为空，初始化超级管理员失败，请手动清空数据库',
      )
    }
    // 加密密码
    user.password = md5Crypto(user.password as string)

    // 去除前端可能给的多余ID（自增字段）
    user.id = null
    // 强制超级管理员
    user.group = Group.SUPER_ADMIN
    const registeredUser = await Action.Create(user)
    return new Restful(
      CodeDictionary.SUCCESS,
      '注册成功',
      Omit(registeredUser.toJSON() as any, ['password']),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `注册失败, ${String(e.message)}`,
    )
  }
}

/**
 * 添加账号
 * @param { User } user
 */
const Register = async (user: User): Promise<Restful> => {
  try {
    let existedUser = await Action.Retrieve('userAccount', user.userAccount)
    if (isDef(existedUser)) {
      return new Restful(
        CodeDictionary.REGISTER_ERROR__USERACCOUNT_EXISTED,
        '账号已存在',
      )
    }
    existedUser = await Action.Retrieve('userName', user.userName)
    if (isDef(existedUser)) {
      return new Restful(
        CodeDictionary.REGISTER_ERROR__USERACCOUNT_EXISTED,
        '账号已存在',
      )
    }
    // 加密密码
    user.password = md5Crypto(user.password as string)

    // 去除前端可能给的多余ID（自增字段）
    user.id = null
    // 强制普通用户
    user.group = Group.SUBSCRIBER
    const registeredUser = await Action.Create(user)
    return new Restful(
      CodeDictionary.SUCCESS,
      '注册成功',
      Omit(registeredUser.toJSON() as any, ['password']),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `注册失败, ${String(e.message)}`,
    )
  }
}

/**
 * 登录
 * @param { User } user
 */
const Login = async (
  userAccount: string,
  password: string,
): Promise<Restful> => {
  try {
    const existedUser = await Action.Retrieve('userAccount', userAccount)
    if (isUndef(existedUser)) {
      return new Restful(CodeDictionary.LOGIN_ERROR, '账号或密码错误')
    }
    // 匹配密码
    if (md5Crypto(password) === existedUser.password) {
      return new Restful(
        CodeDictionary.SUCCESS,
        '登陆成功',
        Omit(existedUser.toJSON() as any, ['password']),
      )
    }
    return new Restful(CodeDictionary.LOGIN_ERROR, '账号或密码错误')
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `登陆失败, ${String(e.message)}`,
    )
  }
}

/**
 * 通过id查询单个用户
 * @param { number } id
 */
const Retrieve__ID = async (id: number): Promise<Restful> => {
  try {
    const user = await Action.Retrieve__Safely('id', id)
    if (isUndef(user)) {
      return new Restful(
        CodeDictionary.RETRIEVE_ERROR__USER_NON_EXISTED,
        '用户不存在',
      )
    }
    return new Restful(CodeDictionary.SUCCESS, '查询成功', user.toJSON())
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询失败, ${String(e.message)}`,
    )
  }
}

/**
 * 遍历用户
 */
const Retrieve__All = async (): Promise<Restful> => {
  try {
    const users = await Action.Retrieve__All__Safely()
    return new Restful(CodeDictionary.SUCCESS, '查询成功', users)
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询失败, ${String(e.message)}`,
    )
  }
}

/**
 * 编辑用户
 */
const Edit = async (user: any): Promise<Restful> => {
  try {
    const existedUser = await Action.Retrieve('id', user.id as number)
    if (isUndef(existedUser)) {
      return new Restful(1, '账号不存在')
    }

    // TODO: 暂时不给更改密码
    delete user.password
    const newUser = await Action.Update(existedUser, user)
    return new Restful(
      CodeDictionary.SUCCESS,
      '编辑成功',
      Omit(newUser.toJSON() as any, ['password']),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `编辑失败, ${String(e.message)}`,
    )
  }
}

/**
 * 删除用户
 */
const Delete = async (id: string) => {
  try {
    const existedUser = await Action.Retrieve('id', Number(id))
    if (isUndef(existedUser)) {
      return new Restful(1, '账号不存在')
    }
    const deleteRow = await Action.Delete(Number(id))
    return deleteRow > 0
      ? new Restful(CodeDictionary.SUCCESS, `删除账号成功`)
      : new Restful(CodeDictionary.DELETE_ERROR__USER, `删除账号失败`)
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `删除账号失败, ${String(e.message)}`,
    )
  }
}

export default {
  Init,
  Register,
  Login,
  Retrieve__ID,
  Retrieve__All,
  Edit,
  Delete,
}
