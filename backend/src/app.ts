import express from 'express'

import {
  TestRouter,
  InitRouter,
  UserRouter,
  PostRouter,
  PostCommentRouter,
  PostTagRouter,
  MailRouter,
  MailCaptchaRouter,
  UploadRouter,
  OptionRouter,
  TemplateRouter,
} from '@routes'
import {
  errorHandler,
  checkJWT,
  logger,
  checkValidUser,
  checkGroup,
} from '@middleware'
import { isDev } from '@const'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 中间件
app.use(checkJWT)
app.use(logger)
app.use(checkValidUser)
app.use(checkGroup)

// 业务路由
app.set('trust proxy', '127.0.0.1')
app.use('/api/init', InitRouter)
app.use('/api/test', TestRouter)
app.use('/api/user', UserRouter)
app.use('/api/post', PostRouter)
app.use('/api/post-comment', PostCommentRouter)
app.use('/api/post-tag', PostTagRouter)
app.use('/api/mail', MailRouter)
app.use('/api/captcha', MailCaptchaRouter)
app.use('/api/upload', UploadRouter)
app.use('/api/option', OptionRouter)
isDev && app.use('/api/template', TemplateRouter)

// 包底错误处理中间件
app.use(errorHandler)
export default app
