import { checkIntegrity, isUndef, Restful } from 'utils'
import EXPRESS from 'express'
import { PostCommentService as Service } from '@service'
import asyncWrapper from 'async-wrapper-express-ts'
import { PostComment } from '@models'
import { CodeDictionary } from '@const'

const postCommentRouter = EXPRESS.Router()

/**
 * 添加评论
 * @path /create
 */
postCommentRouter.post(
  '/create',
  asyncWrapper(async (req, res, next) => {
    const comment = PostComment.build(req.body)
    if (
      !checkIntegrity(
        comment,
        ['pid', 'uid', 'content'] || isUndef(res.locals.ip),
      )
    ) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      comment.ip = res.locals.ip
      res.status(200).json(await Service.Create(comment))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 删除评论
 * @path /delete-admin
 */
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

/**
 * 点赞评论
 * @path /like
 */
postCommentRouter.post(
  '/like',
  asyncWrapper(async (req, res, next) => {
    const { id } = req.body
    if (isUndef(id)) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Like(id))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 踩评论
 * @path /dislike
 */
postCommentRouter.post(
  '/dislike',
  asyncWrapper(async (req, res, next) => {
    const { id } = req.body
    if (isUndef(id)) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Dislike(id))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

export default postCommentRouter
