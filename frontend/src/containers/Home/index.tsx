import { PathName, RouteConfig } from '@/routes'
import { CssBaseline } from '@mui/material'
import React, { FC, Fragment, useEffect } from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { isDef } from '@/utils/tools'
import classnames from 'classnames'
import { useDeskTopSize } from '@/hooks/useScreenSize'

// hooks
import useHome from './useHome'
import useStyles from './useStyles'

// components
import { AppBar } from '@/components/AppBar'
import { Drawer } from '@/components/Drawer'
import UserStatus from '@/components/UserStatus'
import Footer from '@/components/Footer'
// import { Navigation } from '@/containers/Home/Navigation'

const Home: FC<RouteComponentProps & RouteConfig> = (props) => {
  const { routes, location, history } = props
  const classes = useStyles()
  const isDeskTopSize = useDeskTopSize()

  useEffect(() => {
    if (location.pathname === PathName._HOME) {
      history.replace(PathName.HOME)
    }
  }, [])

  const {
    state,
    drawerOpen,
    setDrawerOpen,
    blogConfig,
    // tabs,
    // curTabIdx,
    // setCurTabIdx,
  } = useHome(location, isDeskTopSize)

  // const onCurTabIdxChange = (event: React.ChangeEvent<{}>, newVal: number) => {
  //   setCurTabIdx(newVal)
  //   history.push(tabs[newVal].path) // TODO: Tab页面跳转应该清空路由栈
  // }

  return (
    <Fragment>
      <CssBaseline />
      <Drawer
        blogConfig={blogConfig}
        onClose={() => {
          setDrawerOpen(false)
        }}
        onOpen={() => {
          setDrawerOpen(true)
        }}
        open={drawerOpen}
      />
      <AppBar
        className={classnames(classes.appBar, {
          [classes.appBarShift]: drawerOpen && isDeskTopSize,
        })}
        id="App-Bar"
        onClick={() => {
          setDrawerOpen(!drawerOpen)
        }}
        suffix={<UserStatus />}
        title={state.appBarTitle}
      />
      {/* <Navigation
        curTabIdx={curTabIdx}
        onChange={onCurTabIdxChange}
        tabs={tabs}
      /> */}

      {isDef(routes) && Boolean(routes?.length) && (
        <main
          className={classnames(classes.content, 'relative', {
            [classes.contentShift]: drawerOpen && isDeskTopSize,
          })}
          id="App-Home"
        >
          <Switch location={location}>
            {routes.map(
              ({ path, routeProps, routes, component: Component }) => (
                <Route
                  {...routeProps}
                  key={path}
                  path={path}
                  render={(props: any) => (
                    <Component {...props} routes={routes} />
                  )}
                />
              ),
            )}
          </Switch>
          <Footer id="App-Footer" />
        </main>
      )}
    </Fragment>
  )
}
export default Home
