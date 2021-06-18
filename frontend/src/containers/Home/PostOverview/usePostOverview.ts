import { Request } from '@/utils'
import { PostType, Toggle, PostWithAuthor } from '@/utils/Request/Post'
import { useEffect, useState } from 'react'
import * as H from 'history'
// import { useActivate } from 'react-activation'
import { isDef, scrollIntoTop } from '@/utils/tools'
import { store } from '@/store'
import { useSelector } from 'react-redux'
import { PathName, RouteName } from '@/routes'
import { useHistory } from 'react-router-dom'
import { useAsync } from 'react-use'

export default (location: H.Location<unknown>) => {
  const dispatch = useSelector(() => store.dispatch.common)
  const query = new URLSearchParams(location.search)
  const history = useHistory()

  const PAGE = Number(query.get('page')) || 1
  const CAPACITY = Number(query.get('capacity')) || 5
  const IS_ASC = (Number(query.get('isASC')) as unknown) as Toggle
  const _POST_TYPES = (query.getAll('postTypes') as unknown) as PostType[]
  const POST_TYPES: PostType[] = _POST_TYPES.length
    ? _POST_TYPES
    : [PostType.POST, PostType.LANDSCAPE]
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(PAGE)
  const [capacity, setCapacity] = useState(CAPACITY)
  const [total, setTotal] = useState(0)
  const [maxPage, setMaxPage] = useState(1)
  const [isASC, setIsASC] = useState(IS_ASC)
  const [postTypes, setPostTypes] = useState(POST_TYPES)
  const [posts, setPosts] = useState<PostWithAuthor[]>([])

  const RetrieveAll = async (
    page: number,
    capacity: number,
    isASC: Toggle,
    postTypes: PostType[],
  ) => {
    scrollIntoTop()
    setLoading(true)
    const res = await Request.Post.RetrieveAll(page, capacity, isASC, postTypes)
    setLoading(false)
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
    dispatch.SET_APPBAR_TITLE(RouteName.POST)
  }, [])

  useEffect(() => {
    setPage(PAGE)
    setCapacity(CAPACITY)
    setIsASC(IS_ASC)
    setPostTypes(POST_TYPES)
  }, [location.search])

  useAsync(async () => {
    const maxPage = await RetrieveAll(page, capacity, isASC, postTypes)
    if (isDef(maxPage) && page > maxPage) {
      // 无效路由参数
      history.replace(PathName.NOT_FOUND_PAGE)
    }
  }, [page, capacity, isASC, postTypes])

  // 生成query-params
  const paginationQuery = new URLSearchParams()
  query.set('capacity', String(capacity))
  query.set('isASC', String(isASC))
  postTypes.forEach((postType) => query.set('postType', String(postType)))

  return { loading, page, total, maxPage, posts, paginationQuery }
}
