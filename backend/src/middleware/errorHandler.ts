import { Restful } from '@utils'
import { CodeDictionary } from '@const'
const tokenCodeDictionary = {
  credentials_required: CodeDictionary.JWT_ERROR__REQUIRED,
  invalid_token: CodeDictionary.JWT_ERROR__EXPIRED,
}
export default (err, req, res, next) => {
  if (err.name !== 'UnauthorizedError') {
    // eslint-disable-next-line no-console
    console.error('Error caught:', err)
  } else {
    err.code = tokenCodeDictionary[err.code]
  }
  res.status(err.status).json(new Restful(err.code, err?.inner?.message))
  next()
}
