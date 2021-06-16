import EXPRESS from 'express'
import { MailService as Service } from '@service'
import asyncWrapper from 'async-wrapper-express-ts'
import { checkIntegrity, isUndef, Restful } from '@utils'
import { CodeDictionary } from '@const'

const mailRouter = EXPRESS.Router()

/**
 * 查询设置
 * @path /retrieve
 */
mailRouter.get(
  '/retrieve',
  asyncWrapper(async (req: any, res, next) => {
    if (isUndef(req.auth.id)) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Retrieve__UID(req.auth.id as string))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 查询设置
 * @path /retrieve-admin
 */
mailRouter.get(
  '/retrieve-admin',
  asyncWrapper(async (req, res, next) => {
    const { uid } = req.query
    if (isUndef(uid)) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Retrieve__UID(uid as string))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 编辑邮箱设置信息
 * @path /edit
 * @param { Mail } mail
 */
mailRouter.post(
  '/edit',
  asyncWrapper(async (req: any, res, next) => {
    try {
      // 只能编辑自己账户的设置
      if (req.auth.id !== req.body.uid) {
        res.status(403).end()
        return next()
      }
      if (!checkIntegrity(req.body, ['id', 'uid', 'isSubscribed'])) {
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
 * 编辑邮箱设置信息
 * @path /edit-admin
 * @param { Mail } mail
 */
mailRouter.post(
  '/edit-admin',
  asyncWrapper(async (req: any, res, next) => {
    try {
      if (!checkIntegrity(req.body, ['id', 'uid', 'isSubscribed'])) {
        res
          .status(200)
          .json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
        return next()
      }
      res.status(200).json(await Service.Edit__Admin(req.body, req.auth.group))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

export default mailRouter
