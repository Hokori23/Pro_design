import { Router } from 'express'
import jwt from 'jsonwebtoken'
import asyncWrapper from 'async-wrapper-express-ts'

import { UserService as Service } from '@service'
import { User } from 'models'
import { Restful, checkIntegrity, isUndef, isNaN } from '@utils'
import { CodeDictionary } from '@const'
import config from '@config'
const { cryptoConfig, tokenExpiredTime } = config

const userRouter = Router()

/**
 * 初始化超级管理员
 * @path /init
 * @param { User } user
 */
userRouter.post(
  '/init',
  // https://github.com/xiondlph/async-wrapper-express-ts
  asyncWrapper(async (req, res, next) => {
    const user = User.build(req.body)
    if (
      !checkIntegrity(user, ['userAccount', 'userName', 'password', 'email'])
    ) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Init(user))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)
/**
 * 注册
 * @path /register
 * @param { User } user
 */
userRouter.post(
  '/register',
  asyncWrapper(async (req, res, next) => {
    const user = User.build(req.body)
    if (
      !checkIntegrity(user, ['userAccount', 'userName', 'password', 'email'])
    ) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Register(user))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 登录
 * @path /login
 * @param { string } userName
 * @param { string } password
 */
userRouter.post(
  '/login',
  asyncWrapper(async (req, res, next) => {
    const { userAccount, password } = req.body
    if (isUndef(userAccount) || isUndef(password)) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      const result = await Service.Login(userAccount, password)
      if (result.code === 0) {
        // 设置token
        result.data.token = jwt.sign(
          {
            id: result.data.id,
            userAccount,
            group: result.data.group,
          },
          cryptoConfig.secret,
          {
            // 12个小时
            expiresIn: tokenExpiredTime,
          },
        )
      }
      res.status(200).json(result)
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)
/**
 * 遍历/单个查询
 * @path /retrieve
 * @param { string } id?
 */
userRouter.get(
  '/retrieve',
  asyncWrapper(async (req, res, next) => {
    const { id } = req.query
    try {
      if (isUndef(id)) {
        res.status(200).json(await Service.Retrieve__All())
      } else if (isNaN(id)) {
        res
          .status(200)
          .json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      } else {
        res.status(200).json(await Service.Retrieve__ID(Number(id)))
      }
    } catch (e) {
      // 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 编辑用户
 * @path /edit
 * @param { User } user
 */
userRouter.post(
  '/edit',
  asyncWrapper(async (req: any, res, next) => {
    try {
      if (req.auth.id !== req.body.id) {
        // DEBUG
        res.status(403).end()
        return next()
      }
      if (!checkIntegrity(req.body, ['id'])) {
        res
          .status(200)
          .json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
        return next()
      }
      res.status(200).json(await Service.Edit(req.body))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 注销账号
 * @path /delete
 * @param { string } id
 */
userRouter.post(
  '/delete',
  asyncWrapper(async (req: any, res, next) => {
    try {
      const { id } = req.body
      if (req.auth.id !== id) {
        res.status(403).end()
        return next()
      }
      if (isNaN(id)) {
        res
          .status(200)
          .json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
        return next()
      }
      res.status(200).json(await Service.Delete(id))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

export default userRouter
