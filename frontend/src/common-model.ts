import { createModel } from '@rematch/core'
import { RequestSnackBarProps } from './components/RequestSnackBar'
import { RootModel } from './models'
import { ACCESS_TOKEN_NAME, USER_INFO_NAME, BLOG_CONFIG } from './utils/const'
import { Option } from './utils/Request/Option'
import { User } from './utils/Request/User'

export interface CommonState {
  userInfo: Partial<User>
  axiosSnackBar: RequestSnackBarProps
  token: string
  isLogin: boolean
  appBarTitle: string
  blogConfig: Option[]
}

export const defaultCommonState: CommonState = {
  userInfo: {},
  axiosSnackBar: {
    color: 'primary',
    message: '',
    open: false,
    autoHideDuration: 3000,
  },
  token: '',
  isLogin: false,
  appBarTitle: '',
  blogConfig: [],
}
export const common = createModel<RootModel>()({
  state: defaultCommonState,
  reducers: {
    SET_AXIOS_SNACK_BAR: (
      state: CommonState,
      newAxiosSnackBar: RequestSnackBarProps,
    ) => {
      state.axiosSnackBar = newAxiosSnackBar
      return state
    },
    CLOSE_AXIOS_SNACK_BAR: (state: CommonState) => {
      state.axiosSnackBar.open = false
      return state
    },
    SET_USER_INFO: (state: CommonState, newUserInfo: Partial<User>) => {
      state.userInfo = newUserInfo
      localStorage.setItem(USER_INFO_NAME, JSON.stringify(newUserInfo))
      return state
    },
    SET_TOKEN: (state: CommonState, newToken: string) => {
      state.token = newToken
      if (newToken) localStorage.setItem(ACCESS_TOKEN_NAME, newToken)
      return state
    },
    LOGIN: (state: CommonState) => {
      state.isLogin = true
      return state
    },
    LOGOUT: (state: CommonState) => {
      state.userInfo = defaultCommonState.userInfo
      state.isLogin = false
      state.token = ''
      localStorage.removeItem(USER_INFO_NAME)
      localStorage.removeItem(ACCESS_TOKEN_NAME)
      return state
    },
    SET_APPBAR_TITLE: (state: CommonState, newTitle: string) => {
      state.appBarTitle = newTitle
      return state
    },
    SET_BLOG_CONFIG: (state: CommonState, newBlogConfig: Option[]) => {
      state.blogConfig = newBlogConfig
      localStorage.setItem(BLOG_CONFIG, JSON.stringify(newBlogConfig))
      return state
    },
  },
})
