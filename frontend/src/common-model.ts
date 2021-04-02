import { createModel } from '@rematch/core'
import { RequestSnackBarProps } from './components/RequestSnackBar'
import { RootModel } from './models'
import { ACCESS_TOKEN_NAME, USER_INFO_NAME } from './utils/const'
import { User } from './utils/Request/user'

export interface CommonState {
  dialogStatus: boolean
  dialogContent: string
  dialogTitle: string
  snackStatus: boolean
  snackContent: string
  userInfo: Partial<User>
  axiosSnackBar: RequestSnackBarProps
}

export const defaultCommonState: CommonState = {
  dialogStatus: false,
  dialogContent: '',
  dialogTitle: '',
  snackStatus: false,
  snackContent: '',
  userInfo: {},
  axiosSnackBar: {
    color: 'primary',
    message: '',
    open: false,
    autoHideDuration: 3000,
  },
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
      if (state.userInfo)
        localStorage.setItem(USER_INFO_NAME, JSON.stringify(state.userInfo))
      return state
    },
    LOGOUT: (state: CommonState) => {
      state.userInfo = defaultCommonState.userInfo
      localStorage.removeItem(USER_INFO_NAME)
      localStorage.removeItem(ACCESS_TOKEN_NAME)
      return state
    },
  },
})
