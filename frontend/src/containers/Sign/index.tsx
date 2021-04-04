import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps, Switch } from 'react-router-dom'
import { RouteWithSubRoutes } from '@/App'
import { PathName, RouteConfig } from '@/routes'
import { RootState } from '@/store'

const Sign: FC<RouteComponentProps & RouteConfig> = ({ routes, history }) => {
  const state = useSelector((state: RootState) => state.common)

  // 已登录
  if (state.isLogin) {
    history.replace(PathName.HOME)
    return null
  }

  // 直接跳转子路由LOGIN
  if (history.location.pathname === PathName.SIGN) {
    history.replace(PathName.LOGIN)
    return null
  }
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Switch>
        {routes?.map((route) => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </Switch>
    </div>
  )
}
export default Sign
