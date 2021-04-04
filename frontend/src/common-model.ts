import { createModel } from '@rematch/core'
import { RequestSnackBarProps } from './components/RequestSnackBar'
import { RootModel } from './models'
import { ACCESS_TOKEN_NAME, USER_INFO_NAME } from './utils/const'
import { User } from './utils/Request/user'

export interface CommonState {
  userInfo: Partial<User>
  axiosSnackBar: RequestSnackBarProps
  token: string
  isLogin: boolean
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
      if (newUserInfo)
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
  },
})
