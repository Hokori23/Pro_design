import { checkIntegrity, isUndef, Restful } from 'utils'
import EXPRESS from 'express'
import { PostTagService as Service } from '@service'
import asyncWrapper from 'async-wrapper-express-ts'
import { PostTag } from '@models'
import { CodeDictionary } from '@const'

const postTagRouter = EXPRESS.Router()

/**
 * 添加标签
 * @path /create-admin
 */
postTagRouter.post(
  '/create-admin',
  asyncWrapper(async (req, res, next) => {
    const tag = PostTag.build(req.body)
    if (!checkIntegrity(tag, ['name', 'slug'])) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Create(tag))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 遍历标签
 * @path /retrieve
 */
postTagRouter.get(
  '/retrieve',
  asyncWrapper(async (req, res, next) => {
    try {
      res.status(200).json(await Service.Retrieve__All())
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 编辑标签
 * @path /edit-admin
 */
postTagRouter.post(
  '/edit-admin',
  asyncWrapper(async (req, res, next) => {
    if (!checkIntegrity(req.body, ['id', 'name', 'slug'])) {
      res.status(200).json(new Restful(CodeDictionary.PARAMS_ERROR, '参数错误'))
      return next()
    }
    try {
      res.status(200).json(await Service.Edit(req.body))
    } catch (e) {
      // TODO: 进行邮件提醒
      res.status(500).end()
    }
    next()
  }),
)

/**
 * 删除标签
 * @path /delete-admin
 */
postTagRouter.post(
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

export default postTagRouter
