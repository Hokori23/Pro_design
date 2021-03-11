import expressJwt from 'express-jwt'
import config from 'proj.config'
import { ROUTER_WHITE_LIST } from '@utils/const'
const {
  cryptoConfig: { secret },
} = config
export default expressJwt({
  secret,
  algorithms: ['HS256'],
  requestProperty: 'auth',
}).unless({
  path: ROUTER_WHITE_LIST, // 指定路径不经过 Token 解析
})
