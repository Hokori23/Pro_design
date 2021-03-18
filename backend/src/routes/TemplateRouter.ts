/* eslint-disable @typescript-eslint/no-var-requires */
import asyncWrapper from 'async-wrapper-express-ts'
import EXPRESS from 'express'
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import template from '@mailer/template'
import { getBlogConfig } from '@mailer/template/utils'
import config from '@config'

const templateRouter = EXPRESS.Router()
const fsp = fs.promises

const obj = {
  ejsOutputString: '',
}
/**
 * 初始化数据库
 */
templateRouter.get(
  '',
  asyncWrapper(async (req, res, next) => {
    if (!obj.ejsOutputString) {
      obj.ejsOutputString = (
        await fsp.readFile(path.resolve('./src/mailer/index.ejs'))
      ).toString()
    }
    const blogConfig = await getBlogConfig()
    if (req.query.name) {
      const importPath = path.resolve(
        __dirname,
        `../mailer/template/${req.query.name as string}`,
      )
      const { exampleAttribute, OutputTemplate } = require(importPath)
      const content = await OutputTemplate(exampleAttribute)
      res.status(200).send(content)
    } else {
      const content = ejs.render(obj.ejsOutputString, {
        blogConfig,
        port: config.port,
        templates: Object.keys(template),
      })
      res.status(200).send(content)
    }
    next()
  }),
)

export default templateRouter
