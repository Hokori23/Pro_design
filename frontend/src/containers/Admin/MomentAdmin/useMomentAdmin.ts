import { Request } from '@/utils'
import { PostType, Toggle, PostWithAuthor } from '@/utils/Request/Post'
import { useEffect, useState } from 'react'
import * as H from 'history'
// import { useActivate } from 'react-activation'
import { scrollIntoTop, isDef } from '@/utils/tools'
import { store } from '@/store'
import { useSelector } from 'react-redux'
import { PathName, RouteName } from '@/routes'
import { PageChangeParams } from '@material-ui/data-grid'
import { useAsync } from 'react-use'
import { useHistory } from 'react-router-dom'

export default (location: H.Location<unknown>) => {
  const dispatch = useSelector(() => store.dispatch.common)
  const query = new URLSearchParams(location.search)
  const history = useHistory()

  const PAGE = Number(query.get('page')) || 1
  const CAPACITY = Number(query.get('capacity')) || 20
  const IS_ASC = (Number(query.get('isASC')) as unknown) as Toggle
  const _POST_TYPES = (query.getAll('postTypes') as unknown) as PostType[]
  const POST_TYPES: PostType[] = _POST_TYPES.length
    ? _POST_TYPES
    : [PostType.MOMENT]
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(PAGE)
  const [capacity, setCapacity] = useState(CAPACITY)
  const [total, setTotal] = useState(0)
  const [isASC, setIsASC] = useState(IS_ASC)
  const [postTypes, setPostTypes] = useState(POST_TYPES)
  const [posts, setPosts] = useState([] as PostWithAuthor[])

  const RetrieveAll = async (
    page: number,
    capacity: number,
    isASC: Toggle,
    postTypes: PostType[],
  ) => {
    setLoading(true)
    const res = await Request.Post.RetrieveAll__Admin(
      page,
      capacity,
      isASC,
      postTypes,
    )
    setLoading(false)
    if (res?.data) {
      scrollIntoTop()
      const data = res.data
      if (!data.total) return undefined // 如果不存在说说，则不跳转
      const maxPage = Math.ceil(data.total / capacity)
      setTotal(data.total)
      setPosts(res.data.posts)
      return maxPage
    }
  }

  useEffect(() => {
    dispatch.SET_APPBAR_TITLE(`管理${RouteName.POST_ADMIN}`)
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
  // useActivate(() => {
  //   void RetrieveAll(page, capacity, isASC, postTypes)
  // })

  const handlePageChange = (params: PageChangeParams) => {
    setPage(params.page + 1)
  }

  return {
    loading,
    total,
    capacity,
    isASC,
    postTypes,
    posts,
    handlePageChange,
  }
}
