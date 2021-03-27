import asyncWrapper from 'async-wrapper-express-ts'
import EXPRESS from 'express'
import { Restful } from '@utils'
import { init } from '@database'
import { CodeDictionary } from '@const'
import { DBAction } from '@action'
import { Init as OptionInit } from '@action/OptionAction'

const initRouter = EXPRESS.Router()

/**
 * 初始化数据库
 */
initRouter.post(
  '/',
  asyncWrapper(async (req, res, next) => {
    try {
      const tableRows = await DBAction.GetTableRows()
      if (tableRows > 0) {
        res
          .status(200)
          .json(
            new Restful(
              CodeDictionary.INIT_ERROR__DATABASE_EXISTED,
              '数据库不为空，请手动清空数据库',
            ),
          )
        return next()
      }
      await init()
      await OptionInit()
      res.status(200).json(new Restful(0, '初始化数据库成功'))
    } catch (e) {
      res
        .status(200)
        .json(
          new Restful(
            CodeDictionary.INIT_ERROR__DATABASE_ERROR,
            `初始化数据库失败，${String(e)}`,
          ),
        )
    }
    next()
  }),
)
/**
 * 格式化数据库
 */
initRouter.post(
  '/force-admin',
  asyncWrapper(async (req, res, next) => {
    try {
      await init()
      await OptionInit()
      res.status(200).json(new Restful(0, '格式化数据库成功'))
    } catch (e) {
      res
        .status(200)
        .json(
          new Restful(
            CodeDictionary.INIT_ERROR__DATABASE_ERROR,
            `格式化数据库失败，${String(e)}`,
          ),
        )
    }
    next()
  }),
)

initRouter.get(
  '/table-rows-admin',
  asyncWrapper(async (req, res, next) => {
    try {
      res
        .status(200)
        .json(
          new Restful(0, '获取数据库表数量成功', await DBAction.GetTableRows()),
        )
    } catch (e) {
      res
        .status(200)
        .json(
          new Restful(
            CodeDictionary.COMMON_ERROR,
            `获取数据库表数量失败，${String(e)}`,
          ),
        )
    }
  }),
)
export default initRouter
