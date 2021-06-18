import { Request } from '@/utils'
import { Toggle, PostWithAuthor } from '@/utils/Request/Post'
import { useEffect, useState } from 'react'
import * as H from 'history'
import { isDef, scrollIntoTop } from '@/utils/tools'
import { store } from '@/store'
import { useSelector } from 'react-redux'
import { PathName, RouteName } from '@/routes'
import { useHistory, useParams } from 'react-router-dom'
import { useAsync } from 'react-use'
import { PostTag } from '@/utils/Request/PostTag'
import { useTheme } from '@material-ui/core'

export default (location: H.Location<unknown>) => {
  const dispatch = useSelector(() => store.dispatch.common)
  const query = new URLSearchParams(location.search)
  const theme = useTheme()
  const history = useHistory()
  const { slug } = useParams<{ slug: string }>()

  const PAGE = Number(query.get('page')) || 1
  const CAPACITY = Number(query.get('capacity')) || 5
  const IS_ASC = (Number(query.get('isASC')) as unknown) as Toggle
  const [loadingTag, setLoadingTag] = useState(true)
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [page, setPage] = useState(PAGE)
  const [capacity, setCapacity] = useState(CAPACITY)
  const [total, setTotal] = useState(0)
  const [maxPage, setMaxPage] = useState(1)
  const [isASC, setIsASC] = useState(IS_ASC)
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [tag, setTag] = useState<PostTag | null>(null)

  const RetrieveTag = async () => {
    if (!slug) return
    scrollIntoTop()
    setLoadingTag(true)
    const res = await Request.PostTag.RetrieveBySlug(slug)
    setLoadingTag(false)
    if (res?.data) {
      setTag(res.data)
    } else {
      setLoadingPosts(false)
    }
    return res?.data
  }
  const RetrieveAll = async (
    page: number,
    capacity: number,
    isASC: Toggle,
    tids: number[],
  ) => {
    if (!slug) return
    scrollIntoTop()
    setLoadingPosts(true)
    const res = await Request.Post.RetrieveTag(page, capacity, isASC, tids)
    setLoadingPosts(false)
    if (res?.data) {
      const data = res.data
      if (!data.total) return undefined // 如果不存在文章，则不跳转
      const maxPage = Math.ceil(data.total / capacity)
      setTotal(data.total)
      setMaxPage(maxPage)
      setPosts(res.data.posts)
      return maxPage
    }
  }

  useEffect(() => {
    dispatch.SET_APPBAR_TITLE(`查询${RouteName.POST}`)
  }, [])

  useEffect(() => {
    setPage(PAGE)
    setCapacity(CAPACITY)
    setIsASC(IS_ASC)
  }, [location.search])

  useAsync(async () => {
    const tag = await RetrieveTag()
    if (!tag) return
    dispatch.SET_APPBAR_TITLE(
      `${RouteName.POST_TAG}"${tag.name}"下的${RouteName.POST}`,
    )
    void RetrieveAll(page, capacity, isASC, [tag.id as number])
  })
  useAsync(async () => {
    if (!slug || !tag) return
    const maxPage = await RetrieveAll(page, capacity, isASC, [tag.id as number])
    if (isDef(maxPage) && page > maxPage) {
      // 无效路由参数
      history.replace(PathName.NOT_FOUND_PAGE)
    }
    // TODO: tids
  }, [page, capacity, isASC, tag?.id])

  // 生成query-params
  const paginationQuery = new URLSearchParams()
  query.set('capacity', String(capacity))
  query.set('isASC', String(isASC))

  const tagStyle = () => {
    if (!tag) return
    const { iconColor, iconClass } = tag
    if (iconClass) return undefined
    return iconColor && iconColor !== 'default'
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
    total,
    maxPage,
    posts,
    tag,
    paginationQuery,
    tagStyle,
  }
}
