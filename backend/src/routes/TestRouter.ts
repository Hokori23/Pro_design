import { Restful } from 'utils'
import EXPRESS from 'express'
import miment from 'miment'

const ROUTER = EXPRESS.Router()

ROUTER.get('/', (_req, res, next) => {
  const currentTime = miment().format('YYYY-MM-DD hh:mm:ss') as string
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
ROUTER.get('/token', (_req, res, next) => {
  const currentTime = miment().format('YYYY-MM-DD hh:mm:ss') as string
  res
    .status(200)
    .json(
      new Restful(0, 'Hello world(token needed)', `Time now is ${currentTime}`),
    )
  next()
})
export default ROUTER
