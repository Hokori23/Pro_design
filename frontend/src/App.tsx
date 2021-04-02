import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { RouteConfig, routes } from './routes'
import { RootState, history /*, store */ } from '@/store'
import { ConnectedRouter } from 'connected-react-router'
import { Portal } from '@material-ui/core'
import { RequestSnackBar } from '@/components/RequestSnackBar'
import './boot'
import 'animate.css'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map((route) => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
        </Switch>
      </ConnectedRouter>
    </div>
  )
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.

/**
 * 路由守卫
 */
export const RouteWithSubRoutes = ({
  path,
  routeProps,
  routes,
  component: Component,
}: RouteConfig): JSX.Element => {
  const state = useSelector((state: RootState) => state.common)
  // const dispatch = useSelector(() => store.dispatch.common)
  const root = document.querySelector('#root')
  return (
    <Fragment>
      <Route
        {...routeProps}
        path={path}
        render={(props: any) => (
          <Component {...props} {...props} routes={routes} />
        )}
      />
      <Portal container={root}>
        <RequestSnackBar {...state.axiosSnackBar} />
      </Portal>
    </Fragment>
  )
}
export default App
