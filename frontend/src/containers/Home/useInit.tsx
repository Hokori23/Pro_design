import { Request } from '@/utils'
import { isDef } from '@/utils/tools'
import { store } from '@/store'
const { dispatch } = store

export default async () => {
  // 每次进入页面，请求最新数据，比如博客信息
  let blogConfig
  const blogConfigData = await Request.Option.RetrieveAll()
  if (
    isDef(blogConfigData) &&
    blogConfigData.code === 0 &&
    isDef(blogConfigData.data)
  ) {
    dispatch.common.SET_BLOG_CONFIG(blogConfigData.data)
    blogConfig = blogConfigData.data
  }
  return {
    blogConfig,
  }
}
