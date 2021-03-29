import { checkIntegrity, Restful } from 'utils'
import EXPRESS from 'express'
import { MailCaptchaService as Service } from '@service'
import asyncWrapper from 'async-wrapper-express-ts'
import { CodeDictionary } from '@const'
import { User } from '@models'

const mailCaptchaRouter = EXPRESS.Router()

/**
 * 发送邮箱验证码
 * @path /get
 */
mailCaptchaRouter.get(
  '/get',
  asyncWrapper(async (req, res, next) => {
    const user = User.build(req.body)
    if (!checkIntegrity(user, ['userAccount', 'userName', 'email'])) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Activate(user))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

export default mailCaptchaRouter
