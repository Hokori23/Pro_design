import express from 'express'

import { TestRouter } from '@routes'
import { errorHandler, checkJWT, logger } from '@middleware'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(logger)
/**
 * JWT中间件
 */
app.use(checkJWT)
// app.use(checkValidUser)
/**
 * 业务路由
 */
app.set('trust proxy', '127.0.0.1')
app.use('/api/test', TestRouter)

// 包底错误处理中间件
app.use(errorHandler)
export default app
