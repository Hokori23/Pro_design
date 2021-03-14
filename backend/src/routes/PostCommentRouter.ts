import { checkIntegrity, isUndef, Restful } from 'utils'
import EXPRESS from 'express'
import { PostCommentService as Service } from '@service'
import asyncWrapper from 'async-wrapper-express-ts'
import { PostComment } from '@models'
import { CodeDictionary } from '@const'

const postCommentRouter = EXPRESS.Router()

postCommentRouter.post(
  '/create',
  asyncWrapper(async (req, res, next) => {
    const comment = PostComment.build(req.body)
    if (!checkIntegrity(comment, ['uid', 'content', 'email'])) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Create(comment))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)
postCommentRouter.post(
  '/delete-admin',
  asyncWrapper(async (req, res, next) => {
    const { id } = req.body
    if (isUndef(id)) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Delete(id))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)
export default postCommentRouter
