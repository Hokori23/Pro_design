import { ComponentType } from 'react'
import { RouteComponentProps, RouteProps } from 'react-router-dom'
import Demo from './containers/Demo'
import Init from './containers/Init'
import Sign from './containers/Sign'
import Login from './containers/Sign/Login'
import Register from './containers/Sign/Register'
import Home from './containers/Home'
import HomeOverview from './containers/Home/HomeOverview'
import PostOverview from './containers/Home/PostOverview'
import PostDetail from './containers/Home/PostDetail'
import MomentOverview from './containers/Home/MomentOverview'
import User from './containers/Home/User'
import NotFoundPage from './containers/NotFoundPage'
import Redirect404 from './containers/Redirect404'
import Admin from './containers/Admin'
import PostTagAdmin from './containers/Admin/PostTagAdmin'

export enum PathName {
  DEMO = '/demo',
  INIT = '/init',
  SIGN = '/sign',
  LOGIN = '/sign/login',
  REGISTER = '/sign/register',
  _HOME = '/',
  HOME = '/home',
  POST_OVERVIEW = '/post',
  _POST_DETAIL = '/post/detail',
  POST_DETAIL = '/post/detail/:id',
  MOMENT_OVERVIEW = '/moment',
  _MOMENT_DETAIL = '/moment/detail',
  USER = '/user',
  ADMIN = '/admin',
  POST_TAG_ADMIN = '/admin/post-tag',
  _NOT_FOUND_PAGE = '*',
  NOT_FOUND_PAGE = '/404',
}

export enum RouteName {
  DEMO = 'DEMO',
  INIT = '初始化博客',
  LOGIN = '登录',
  REGISTER = '注册',
  HOME = '首页',
  POST = '文章',
  MOMENT = '说说',
  USER = '用户中心',
  NOT_FOUND_PAGE = '找不到页面',
  ADMIN = '后台管理中心',
  POST_TAG_ADMIN = '管理标签',
}

/* 集中存放所有路由配置 */
export const routes: RouteConfig[] = [
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
      },
      {
        path: PathName.REGISTER,
        component: Register,
        routeProps: {
          exact: true,
        },
      },
      {
        path: PathName._NOT_FOUND_PAGE,
        component: Redirect404,
      },
    ],
  },
  {
    path: PathName.ADMIN,
    component: Admin,
    routeProps: {
      exact: true,
    },
  },
  {
    path: PathName.ADMIN,
    component: Admin,
    routes: [
      {
        path: PathName.POST_TAG_ADMIN,
        component: PostTagAdmin,
        routeProps: {
          exact: true,
        },
      },
    ],
  },
  {
    path: PathName._HOME,
    component: Home,
    routeProps: {
      exact: true,
    },
  },
  {
    path: PathName._HOME,
    component: Home,
    routes: [
      {
        path: PathName.HOME,
        component: HomeOverview,
      },
      {
        path: PathName.POST_DETAIL,
        component: PostDetail,
      },
      {
        path: PathName.POST_OVERVIEW,
        component: PostOverview,
      },
      {
        path: PathName.MOMENT_OVERVIEW,
        component: MomentOverview,
      },
      {
        path: PathName.USER,
        component: User,
      },
      {
        path: PathName._NOT_FOUND_PAGE,
        component: NotFoundPage,
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
