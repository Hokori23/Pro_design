import { RouteProps } from 'react-router-dom'
import Demo from './containers/Demo'
import Init from './containers/Init'
import Sign from './containers/Sign'
import Login from './containers/Sign/Login'
import Register from './containers/Sign/Register'
import Home from './containers/Home'

export enum PathName {
  DEMO = '/demo',
  INIT = '/init',
  SIGN = '/sign',
  LOGIN = '/sign/login',
  REGISTER = '/sign/register',
  HOME = '/',
}

/* 集中存放所有路由配置 */
export const routes: RouteConfig[] = [
  {
    path: PathName.DEMO,
    component: Demo,
  },
  {
    path: PathName.INIT,
    component: Init,
  },
  {
    path: PathName.SIGN,
    component: Sign,
    routes: [
      {
        path: PathName.LOGIN,
        component: Login,
      },
      {
        path: PathName.REGISTER,
        component: Register,
      },
    ],
  },
  {
    path: PathName.HOME,
    component: Home,
    routeProps: {
      exact: true,
    },
  },
]

export interface RouteConfig {
  /* 路由路径 */
  path: string
  /* 需要渲染的组件 */
  component: any
  /* 子路由 */
  routes?: RouteConfig[]
  routeProps?: RouteProps
}
