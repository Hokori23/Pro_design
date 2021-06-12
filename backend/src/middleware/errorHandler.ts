import { Restful } from '@utils'
import { CodeDictionary } from '@const'
import { Response, NextFunction } from 'express'

const tokenCodeDictionary = {
  credentials_required: CodeDictionary.JWT_ERROR__REQUIRED,
  invalid_token: CodeDictionary.JWT_ERROR__EXPIRED,
}
export default (err, req: any, res: Response, next: NextFunction) => {
  if (err.name !== 'UnauthorizedError') {
    // eslint-disable-next-line no-console
    console.error('Error caught:', err)
  } else {
    err.code = tokenCodeDictionary[err.code]
  }
  if (req.path === '/api/user/check') {
    res
      .status(200)
      .json(new Restful(CodeDictionary.EXPIRED_LOGIN, '登陆已失效'))
  } else {
    res.status(err.status).json(new Restful(err.code, err?.inner?.message))
  }
  next()
}
