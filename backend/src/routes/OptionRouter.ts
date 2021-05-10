import { checkIntegrity, isUndef, Restful } from 'utils'
import EXPRESS from 'express'
import { OptionService as Service } from '@service'
import asyncWrapper from 'async-wrapper-express-ts'
import { CodeDictionary } from '@const'

const optionRouter = EXPRESS.Router()

/**
 * 保存设置
 * @path /save-admin
 */
optionRouter.post(
  '/save-admin',
  asyncWrapper(async (req, res, next) => {
    const { options } = req.body
    if (
      isUndef(options) ||
      options.some((option) => !checkIntegrity(option, ['module', 'key']))
    ) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Save(options))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 保存设置
 * @path /retrieve
 */
optionRouter.get(
  '/retrieve',
  asyncWrapper(async (req, res, next) => {
    try {
      res.status(200).json(await Service.Retrieve())
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

export default optionRouter
