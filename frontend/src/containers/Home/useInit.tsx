import { Request } from '@/utils'
import { store } from '@/store'
const { dispatch } = store

export default async () => {
  // 每次进入页面，请求最新数据，比如博客信息
  let blogConfig
  const res = await Request.Option.RetrieveAll()
  if (res?.data && res?.code === 0) {
    dispatch.common.SET_BLOG_CONFIG(res.data)
    blogConfig = res.data
  }
  return {
    blogConfig,
  }
}
