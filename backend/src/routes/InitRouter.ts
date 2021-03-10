import asyncWrapper from 'async-wrapper-express-ts'
import EXPRESS from 'express'
import { Restful } from '@utils'
import sequelize, { init } from '@database'
import { CodeDictionary } from '@const'
import { DBAction } from '@action'

const ROUTER = EXPRESS.Router()

/**
 * 初始化数据库
 */
ROUTER.post(
  '/',
  asyncWrapper(async (req, res, next) => {
    const { force } = req.body
    try {
      await sequelize.authenticate()
      const tableRows = await DBAction.GetTableRows()
      if (tableRows > 0 && !force) {
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
      res.status(200).json(new Restful(0, '初始化数据库成功'))
    } catch (e) {
      // TODO: 进行邮件提醒
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

ROUTER.get(
  '/table-rows',
  asyncWrapper(async (req, res, next) => {
    try {
      res
        .status(200)
        .json(
          new Restful(0, '获取数据库表数量成功', await DBAction.GetTableRows()),
        )
    } catch (e) {
      // TODO: 进行邮件提醒
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
export default ROUTER