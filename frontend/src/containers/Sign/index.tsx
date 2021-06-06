import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import classNames from 'classnames'
import { PathName, RouteConfig } from '@/routes'
import { RootState } from '@/store'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isDef } from '@/utils/tools'
import KeepAlive from 'react-activation'
import './index.less'

const useStyles = makeStyles((theme) => ({
  title: {
    padding: '1rem 2.5rem',
  },
}))

const Sign: FC<RouteComponentProps & RouteConfig> = ({
  routes,
  history,
  location,
}) => {
  const classes = useStyles()
  const state = useSelector((state: RootState) => state.common)

  useEffect(() => {
    // 已登录
    if (state.isLogin) {
      history.replace(PathName.HOME)
    }
  }, [state.isLogin])

  useEffect(() => {
    // 直接跳转子路由LOGIN
    if (location.pathname === PathName.SIGN) {
      history.replace(PathName.LOGIN)
    }
  }, [])

  return (
    <div className="Sign flex flex-column">
      <Paper className={classNames('non-select', classes.title)} elevation={0}>
        <Typography color="primary" noWrap variant="h3">
          Geek Blog
        </Typography>
      </Paper>
      {isDef(routes) && Boolean(routes?.length) && (
        <Switch location={location}>
          {routes.map(({ path, routeProps, routes, component: Component }) => (
            <Route
              key={path}
              {...routeProps}
              path={path}
              render={(props: any) => (
                <KeepAlive id={path} name={path}>
                  <Component {...props} routes={routes} />
                </KeepAlive>
              )}
            />
          ))}
        </Switch>
      )}
    </div>
  )
}
export default Sign
