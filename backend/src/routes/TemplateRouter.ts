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

templateRouter.get(
  '',
  asyncWrapper(async (req, res, next) => {
    if (req.query.name) {
      const importPath = path.resolve(
        __dirname,
        `../mailer/template/${req.query.name as string}`,
      )
      const { exampleAttribute, OutputTemplate } = require(importPath)
      const content = await OutputTemplate(exampleAttribute)
      res.status(200).send(content)
    } else {
      const blogConfig = await getBlogConfig()
      const rawContent = await fsp.readFile(
        path.resolve('./src/mailer/index.ejs'),
        { encoding: 'utf8' },
      )

      const content = ejs.render(rawContent, {
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
