import axios, { AxiosRequestConfig } from 'axios'
import { store } from '@/store'
import { REQUEST_WHITE_LIST } from '../const'
import { Restful } from './type'
import * as User from './User'
import * as Upload from './Upload'
import * as Init from './Init'

const isWhiteUrl = (url: string) => {
  return !REQUEST_WHITE_LIST.every((reg) => !reg.test(url))
}
export const Request = async <T>(config: AxiosRequestConfig) => {
  const { dispatch } = store
  const isWhiteUrlFlag = isWhiteUrl(config.url as string)
  try {
    const token = store.getState().common.token
    const headers = config.headers || {}
    // 如果本地有token，每个非白名单请求都附带上token
    if (token && !isWhiteUrlFlag) {
      headers.Authorization = `Bearer ${token}`
    }
    const res = await axios.request<Restful<T>>({
      ...config,
      headers,
    })
    if (res.status !== 200) {
      dispatch.common.SET_AXIOS_SNACK_BAR({
        color: 'primary',
        open: true,
        message: `请求失败，状态码：${String(res.status)}`,
        autoHideDuration: 3000,
      })
    } else if (
      (isWhiteUrlFlag && res.data.code !== 200) ||
      (!isWhiteUrlFlag && res.data.code !== 0) // TODO: code非零都弹提示框？
    ) {
      dispatch.common.SET_AXIOS_SNACK_BAR({
        color: 'primary',
        open: true,
        message: res.data.message,
        autoHideDuration: 5000,
      })
    }
    return (res.data as unknown) as T
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.response)
    // eslint-disable-next-line no-console
    console.error('网络错误', err)
    if (err?.response?.status === 401 && !isWhiteUrlFlag) {
      dispatch.common.SET_AXIOS_SNACK_BAR({
        color: 'primary',
        open: true,
        message: '登陆失效，请重新登陆',
        autoHideDuration: 6000,
      })
      dispatch.common.LOGOUT()
    }
    if (err?.response?.status === 403) {
      dispatch.common.SET_AXIOS_SNACK_BAR({
        color: 'primary',
        open: true,
        message: '无权进行此操作',
        autoHideDuration: 6000,
      })
    }
  }
}
export { User, Upload, Init }
export default { User, Upload, Init }
