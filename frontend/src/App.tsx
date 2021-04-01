import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { RouteConfig, routes } from './routes'
import { Tabs } from './tabs'
import { RootDispatch, RootState, history } from '@/store'
import './boot'
import { ConnectedRouter } from 'connected-react-router'
import 'animate.css'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
        </Switch>
        <Tabs />
      </ConnectedRouter>
    </div>
  )
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
const mapState = (state: RootState) => ({
  state: state.common,
})
const mapDispatch = (dispatch: RootDispatch) => ({
  dispatch: dispatch.common,
})

/**
 * 路由守卫
 */
const RouteWithSubRoutes = connect(
  mapState,
  mapDispatch,
)(
  ({
    state,
    path,
    dispatch,
    routeProps,
    component: SubComponent,
  }: RouteConfig &
    ReturnType<typeof mapState> &
    ReturnType<typeof mapDispatch>): JSX.Element => {
    return (
      <Fragment>
        <Route
          {...routeProps}
          path={path}
          render={(props: any) => <SubComponent {...props} routes={routes} />}
        />
      </Fragment>
    )
  },
)
export default App
