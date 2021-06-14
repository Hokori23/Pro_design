import { createModel } from '@rematch/core'
import { RequestSnackBarProps } from './components/RequestSnackBar'
import { RootModel } from './models'
import { ACCESS_TOKEN_NAME, USER_INFO_NAME, BLOG_CONFIG } from './utils/const'
import { Option } from './utils/Request/Option'
import { User } from './utils/Request/User'
import { computeDOMHeight } from './utils/tools'

export interface CommonState {
  userInfo: Partial<User>
  axiosSnackBar: RequestSnackBarProps
  token: string
  isLogin: boolean
  appBarTitle: string
  blogConfig: Option[]
  mainHeight: string
}

const defaultAxiosSnackBar: RequestSnackBarProps = {
  color: 'primary',
  message: '',
  open: false,
  autoHideDuration: 3000,
  type: 'info',
  variant: 'filled',
}
export const defaultCommonState: CommonState = {
  userInfo: {},
  axiosSnackBar: { ...defaultAxiosSnackBar },
  token: '',
  isLogin: false,
  appBarTitle: '',
  blogConfig: [],
  mainHeight: '0px',
}
export const common = createModel<RootModel>()({
  state: defaultCommonState,
  reducers: {
    SET_AXIOS_SNACK_BAR: (
      state: CommonState,
      newAxiosSnackBar: RequestSnackBarProps,
    ) => {
      const clonedNewAxiosSnackBar = {
        ...defaultAxiosSnackBar,
        ...newAxiosSnackBar,
      }
      if (!newAxiosSnackBar.onClick) {
        clonedNewAxiosSnackBar.onClick = undefined
      }
      state.axiosSnackBar = clonedNewAxiosSnackBar
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
    SET_MAIN_HEIGHT: (state: CommonState, newHeight?: string) => {
      if (!newHeight) {
        newHeight = `${
          window.innerHeight - (computeDOMHeight('#App-Bar', true) as number)
        }px`
      }
      state.mainHeight = newHeight
      return state
    },
  },
})
