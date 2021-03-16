import { UserAction } from '@action'
import { ROUTER_WHITE_LIST } from '@utils/const'
export default (req, res, next) => {
  if (ROUTER_WHITE_LIST.some((path) => req.path === path)) {
    // 白名单不验证token合法性
    return next()
  }
  // 改成then执行，使用async/await会导致next先调用，整个中间件链会在数据库返回数据前执行完毕
  // https://zhuanlan.zhihu.com/p/87079561
  UserAction.Retrieve('id', req.auth.id)
    .then((user) => {
      if (!user) {
        return res.status(401).end()
      }
      next()
    })
    .catch((e) => {
      // TODO: 进行邮件提醒
    })
}
