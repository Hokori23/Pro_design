import { Request } from '@/utils'
import { Toggle } from '@/utils/Request/Post'
import { useEffect, useState } from 'react'
import * as H from 'history'
import { isDef, scrollIntoTop } from '@/utils/tools'
import { store } from '@/store'
import { useSelector } from 'react-redux'
import { PathName, RouteName } from '@/routes'
import { useHistory, useParams } from 'react-router-dom'
import { useAsync } from 'react-use'
import { useTheme } from '@mui/material/styles'
import { useRequest } from 'ahooks'

export default (location: H.Location<unknown>) => {
  const dispatch = useSelector(() => store.dispatch.common)
  const query = new URLSearchParams(location.search)
  const theme = useTheme()
  const history = useHistory()
  const { slug } = useParams<{ slug: string }>()

  const page = Number(query.get('page')) || 1
  const capacity = Number(query.get('capacity')) || 5
  const isASC = (Number(query.get('isASC')) as unknown) as Toggle

  const [form, setForm] = useState({
    page,
    capacity,
    isASC,
    tids: [] as number[],
  })

  const {
    loading: loadingTag,
    data: tag,
    ...retrieveBySlugService
  } = useRequest(
    async () => {
      const res = await Request.PostTag.RetrieveBySlug(slug)
      const tag = res?.data
      if (!tag) return
      setForm({
        ...form,
        tids: [tag.id as number],
      })
      return tag
    },
    {
      manual: true,
    },
  )

  const { loading: loadingPosts, data, ...retrieveAllService } = useRequest(
    async () => {
      const res = await Request.Post.RetrieveTag(form)
      const { capacity, page } = form
      if (res?.data) {
        const data = res.data
        if (!data.total) return undefined // 如果不存在文章，则不跳转
        const maxPage = Math.ceil(data.total / capacity)
        scrollIntoTop('start', 'auto')
        if (data.total && isDef(maxPage) && page > maxPage) {
          // 无效路由参数
          history.replace(PathName.NOT_FOUND_PAGE)
        }
        return {
          posts: data.posts || [],
          total: data.total,
          maxPage,
        }
      }
    },
    {
      manual: true,
    },
  )

  useEffect(() => {
    setForm({
      ...form,
      page,
      capacity,
      isASC,
    })
  }, [location.search])

  useAsync(async () => {
    const tag = await retrieveBySlugService.runAsync()
    if (!tag) return
    dispatch.SET_APPBAR_TITLE(
      `${RouteName.POST_TAG}"${tag.name}"下的${RouteName.POST}`,
    )
  }, [])

  useEffect(() => {
    if (!slug || !tag) return
    void retrieveAllService.run()
    // TODO: tids
  }, [form, tag])

  // 生成query-params
  const paginationQuery = new URLSearchParams()
  query.set('capacity', String(capacity))
  query.set('isASC', String(isASC))

  const tagStyle = () => {
    if (!tag) return
    const { iconColor, iconClass } = tag
    if (iconClass) return undefined
    return iconColor
      ? {
          backgroundColor: theme.palette[iconColor].main,
          color: theme.palette.getContrastText(theme.palette[iconColor].main),
        }
      : undefined
  }
  return {
    theme,
    loadingTag,
    loadingPosts,
    page,
    ...data,
    tag,
    paginationQuery,
    tagStyle,
    slug,
  }
}
