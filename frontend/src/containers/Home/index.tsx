import { PathName, RouteConfig, RouteName } from '@/routes'
import { store, RootState } from '@/store'
import { CssBaseline, useMediaQuery } from '@material-ui/core'
import React, { FC, Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { isDef } from '@/utils/tools'
import classnames from 'classnames'
import { useTheme } from '@material-ui/core/styles'

import useHome from './useHome'
import useStyles from './useStyles'

// components
import { AppBar } from '@/components/AppBar'
import { Drawer } from '@/components/Drawer'
// import { Navigation } from '@/containers/Home/Navigation'

import KeepAlive, { AliveScope } from 'react-activation'

const Home: FC<RouteComponentProps & RouteConfig> = (props) => {
  const { routes, location /* ,history */ } = props
  const state = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.common)
  const classes = useStyles()
  const theme = useTheme()
  const isDeskTopSize = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    dispatch.SET_APPBAR_TITLE(RouteName.HOME)
  }, [])
  const {
    drawerOpen,
    setDrawerOpen,
    blogConfig,
    // tabs,
    // curTabIdx,
    // setCurTabIdx,
  } = useHome(location)

  // const onCurTabIdxChange = (event: React.ChangeEvent<{}>, newVal: number) => {
  //   setCurTabIdx(newVal)
  //   history.push(tabs[newVal].path) // TODO: Tab页面跳转应该清空路由栈
  // }

  if (!state.isLogin) {
    return <Redirect to={PathName.LOGIN} />
  }
  if (location.pathname === PathName._HOME) {
    return <Redirect to={PathName.HOME} />
  }

  return (
    <Fragment>
      <CssBaseline />
      <Drawer
        blogConfig={blogConfig}
        onClose={() => {
          setDrawerOpen(false)
        }}
        onOpen={() => {
          setDrawerOpen(false)
        }}
        open={drawerOpen}
      />
      <AppBar
        className={classnames(classes.appBar, {
          [classes.appBarShift]: drawerOpen && isDeskTopSize,
        })}
        id="back-to-top-anchor"
        onClick={() => {
          setDrawerOpen(!drawerOpen)
        }}
        title={state.appBarTitle}
      />
      {/* <Navigation
        curTabIdx={curTabIdx}
        onChange={onCurTabIdxChange}
        tabs={tabs}
      /> */}

      {isDef(routes) && Boolean(routes?.length) && (
        <main
          className={classnames(classes.content, {
            [classes.contentShift]: drawerOpen && isDeskTopSize,
          })}
        >
          <AliveScope>
            <Switch location={location}>
              {routes.map(
                ({ path, routeProps, routes, component: Component }, idx) => (
                  <Route
                    {...routeProps}
                    key={path}
                    path={path}
                    render={(props: any) => (
                      <KeepAlive
                        id={`${path}-${JSON.stringify(props.match.params)}`}
                      >
                        {/*
                         * 多份缓存
                         * <https://github.com/CJY0208/react-activation/blob/master/README_CN.md>
                         */}
                        <Component {...props} routes={routes} />
                      </KeepAlive>
                    )}
                  />
                ),
              )}
            </Switch>
          </AliveScope>
        </main>
      )}
    </Fragment>
  )
}
export default Home
