import { PathName, RouteConfig } from '@/routes'
import React, { FC, Fragment, useEffect } from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { RootState } from '@/store'
import { CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { isDef } from '@/utils/tools'
import { useDeskTopSize } from '@/hooks/useScreenSize'

// hooks
import useAdmin from './useAdmin'
import useStyles from './useStyles'

// components
import { AppBar } from '@/components/AppBar'
import { Drawer } from '@/components/Drawer/index__admin'
import UserStatus from '@/components/UserStatus'
import Footer from '@/components/Footer'

const Admin: FC<RouteComponentProps & RouteConfig> = (props) => {
  const { routes, location, history } = props
  const state = useSelector((state: RootState) => state.common)
  const classes = useStyles()
  const isDeskTopSize = useDeskTopSize()
  const { drawerOpen, setDrawerOpen, blogConfig } = useAdmin(isDeskTopSize)

  useEffect(() => {
    if (!state.isLogin) {
      history.replace(PathName.HOME)
    }
  }, [state.isLogin])

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
        color="default"
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
export default Admin
