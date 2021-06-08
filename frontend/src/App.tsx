import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import { RootState, history /*, store */ } from '@/store'
import { ConnectedRouter } from 'connected-react-router'
import { Portal } from '@material-ui/core'
import { RequestSnackBar } from '@/components/RequestSnackBar'
import NotFoundPage from '@/containers/NotFoundPage'
import './boot'
import { AliveScope } from 'react-activation'

const root = document.querySelector('#root')

const Routes: FC = () => {
  return (
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
  )
}

const App = (): JSX.Element => {
  const state = useSelector((state: RootState) => state.common)
  const [appStyle, setAppStyle] = useState<React.CSSProperties>({})
  useEffect(() => {
    // 初始化页面高度
    setAppStyle({
      minHeight: window.screen.availHeight,
    })
  }, [])
  return (
    <div className="App" style={appStyle}>
      <ConnectedRouter history={history}>
        {/**
         * 404页面兜底
         * <https://blog.csdn.net/grepets/article/details/96393575>}
         */}
        <AliveScope>
          <Route
            render={({ location }) =>
              (location as any)?.state?.is404 ? <NotFoundPage /> : <Routes />
            }
          />
        </AliveScope>
        <Portal container={root}>
          <RequestSnackBar {...state.axiosSnackBar} />
        </Portal>
      </ConnectedRouter>
    </div>
  )
}
export default App
