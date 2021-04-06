import { Request } from '.'
import { Restful } from './type'
import { store } from '@/store'

const baseUrl = '/api/user'

export enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
}

export enum GenderCN {
  UNKNOWN = '未知',
  MALE = '男',
  FEMALE = '女',
}

export enum Group {
  SUBSCRIBER = 0,
  ADMIN = 1,
  SUPER_ADMIN = 2,
}

export enum GroupCN {
  SUBSCRIBER = '普通用户',
  ADMIN = '管理员',
  SUPER_ADMIN = '超级管理员',
}

export interface User {
  id: number | null
  userAccount: string
  userName: string
  password?: string
  gender?: Gender
  email: string
  url?: string
  avatarUrl?: string
  profile?: string
  group?: Group
  createdAt?: Date
  updatedAt?: Date
}

export interface LoggedInUser extends User {
  token: string
}

export const Init = async (user: Partial<User>) => {
  return await Request<Restful<User>>({
    method: 'POST',
    url: `${baseUrl}/init`,
    data: user,
  })
}

/**
 * payload: {
 *  userName: string,
 *  password: string
 * }
 */
export const Login = async (user: Partial<User>) => {
  const loggedInUser = await Request<Restful<LoggedInUser>>({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: user,
  })
  return loggedInUser
}

export const Retrieve = async (id: number) => {
  return await Request<Restful<User>>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
    params: {
      id,
    },
  })
}
export const RetrieveAll = async () => {
  return await Request<Restful<User[]>>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
  })
}

export const Register = async (user: Partial<User>) => {
  return await Request<Restful<User>>({
    method: 'POST',
    url: `${baseUrl}/register`,
    data: user,
  })
}

export const Edit = async (user: Partial<User>) => {
  const data = await Request<Restful<User>>({
    method: 'POST',
    url: `${baseUrl}/edit`,
    data: user,
  })
  if (!data?.data) return
  store.dispatch.common.SET_USER_INFO(data.data)
  return data.data
}

export const Delete = async (user: Partial<User>) => {
  const data = await Request<Restful<User>>({
    method: 'POST',
    url: `${baseUrl}/edit`,
    data: user,
  })
  if (!data?.data) return
  store.dispatch.common.SET_USER_INFO(data.data)
  return data.data
}
