import { ComponentType } from 'react'
import { RouteComponentProps, RouteProps } from 'react-router-dom'
import Demo from './containers/Demo'
import Init from './containers/Init'
import Sign from './containers/Sign'
import Login from './containers/Sign/Login'
import Register from './containers/Sign/Register'
import Home from './containers/Home'
import NotFoundPage from './containers/NotFoundPage'
import Redirect404 from './containers/Redirect404'

export enum PathName {
  DEMO = '/demo',
  INIT = '/init',
  SIGN = '/sign',
  LOGIN = '/sign/login',
  REGISTER = '/sign/register',
  HOME = '/',
  _NOT_FOUND_PAGE = '*',
  NOT_FOUND_PAGE = '/404',
}

/* 集中存放所有路由配置 */
export const routes: RouteConfig[] = [
  {
    path: PathName.HOME,
    component: Home,
    routeProps: {
      exact: true,
    },
  },
  {
    path: PathName.DEMO,
    component: Demo,
    routeProps: {
      exact: true,
    },
  },
  {
    path: PathName.INIT,
    component: Init,
    routeProps: {
      exact: true,
    },
  },
  {
    path: PathName.SIGN,
    component: Sign,
    routes: [
      {
        path: PathName.LOGIN,
        component: Login,
        routeProps: {
          exact: true,
        },
        routes: [
          {
            path: PathName._NOT_FOUND_PAGE,
            component: Redirect404,
          },
        ],
      },
      {
        path: PathName.REGISTER,
        component: Register,
        routeProps: {
          exact: true,
        },
        routes: [
          {
            path: PathName._NOT_FOUND_PAGE,
            component: Redirect404,
          },
        ],
      },
      {
        path: PathName._NOT_FOUND_PAGE,
        component: Redirect404,
      },
    ],
  },
  {
    path: PathName._NOT_FOUND_PAGE,
    component: NotFoundPage,
  },
  {
    path: PathName.NOT_FOUND_PAGE,
    component: NotFoundPage,
  },
]

export interface RouteConfig {
  /* 路由路径 */
  path: string
  /* 需要渲染的组件 */
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>
  /* 子路由 */
  routes?: RouteConfig[]
  routeProps?: RouteProps
}
