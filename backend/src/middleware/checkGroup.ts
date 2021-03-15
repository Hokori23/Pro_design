import { Group } from '@models/User'
import {
  ROUTER_WHITE_LIST,
  ROUTER_ADMIN_ALLOW,
  ROUTER_SUPER_ADMIN_ALLOW,
} from '@utils/const'
export default (req, res, next) => {
  if (ROUTER_WHITE_LIST.some((path) => req.path === path)) {
    // 白名单不验证用户权限
    return next()
  }
  const path = req.path
  const group = req.auth.group
  if (group === Group.SUBSCRIBER) {
    if (
      ROUTER_SUPER_ADMIN_ALLOW.includes(path) ||
      ROUTER_ADMIN_ALLOW.includes(path)
    ) {
      return res.status(403).end()
    }
  } else if (group === Group.ADMIN) {
    if (ROUTER_SUPER_ADMIN_ALLOW.includes(path)) {
      return res.status(403).end()
    }
  }
  next()
}
