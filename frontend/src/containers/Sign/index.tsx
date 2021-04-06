import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import classNames from 'classnames'
import { PathName, RouteConfig } from '@/routes'
import { RootState } from '@/store'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isDef } from '@/utils/tools'
import './index.less'

const useStyles = makeStyles((theme) => ({
  title: {
    padding: '1rem 2.5rem',
  },
}))

const Sign: FC<RouteComponentProps & RouteConfig> = ({ routes, history }) => {
  const classes = useStyles()
  const state = useSelector((state: RootState) => state.common)

  // 已登录
  if (state.isLogin) {
    return <Redirect to={PathName.HOME} />
  }

  // 直接跳转子路由LOGIN
  if (history.location.pathname === PathName.SIGN) {
    return <Redirect to={PathName.LOGIN} />
  }

  return (
    <div className="Sign flex flex-column">
      <Paper className={classNames('non-select', classes.title)} elevation={0}>
        <Typography color="primary" noWrap variant="h3">
          Geek Blog
        </Typography>
      </Paper>
      {isDef(routes) && Boolean(routes?.length) && (
        <Switch>
          {routes.map(({ path, routeProps, routes, component: Component }) => (
            <Route
              key={path}
              {...routeProps}
              path={path}
              render={(props: any) => <Component {...props} routes={routes} />}
            />
          ))}
        </Switch>
      )}
    </div>
  )
}
export default Sign
