import { Restful } from 'utils'
import EXPRESS from 'express'
import moment from 'moment'

const testRouter = EXPRESS.Router()

testRouter.get('/', (_req, res, next) => {
  const currentTime = moment().format('YYYY-MM-DD hh:mm:ss')
  res
    .status(200)
    .json(
      new Restful(
        0,
        'Hello world(no need for token)',
        `Time now is ${currentTime}`,
      ),
    )
  next()
})
testRouter.get('/token', (_req, res, next) => {
  const currentTime = moment().format('YYYY-MM-DD hh:mm:ss')
  res
    .status(200)
    .json(
      new Restful(0, 'Hello world(token needed)', `Time now is ${currentTime}`),
    )
  next()
})
export default testRouter
