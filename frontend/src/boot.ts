import { store } from '@/store'
import { ACCESS_TOKEN_NAME, USER_INFO_NAME } from '@/utils/const'

const { dispatch } = store

const token = localStorage.getItem(ACCESS_TOKEN_NAME)
const userInfo = localStorage.getItem(USER_INFO_NAME)
if (!token || !userInfo) {
  localStorage.removeItem(ACCESS_TOKEN_NAME)
  localStorage.removeItem(USER_INFO_NAME)
} else {
  dispatch.common.SET_USER_INFO(JSON.parse(userInfo || 'null'))
  dispatch.common.SET_TOKEN(token)
  dispatch.common.LOGIN()
}
