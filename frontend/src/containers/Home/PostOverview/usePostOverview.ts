import { Request } from '@/utils'
import { PostType, Toggle, Post } from '@/utils/Request/Post'
import { useEffect, useState } from 'react'
import * as H from 'history'
import { useActivate } from 'react-activation'
import { scrollIntoTop } from '@/utils/tools'
import { store } from '@/store'
import { useSelector } from 'react-redux'
import { RouteName } from '@/routes'

export default (location: H.Location<unknown>) => {
  const dispatch = useSelector(() => store.dispatch.common)
  const query = new URLSearchParams(location.search)

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
  const [total, setTotal] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [isASC, setIsASC] = useState(IS_ASC)
  const [postTypes, setPostTypes] = useState(POST_TYPES)
  const [posts, setPosts] = useState([] as Post[])

  const RetrieveAll = async (
    page: number,
    capacity: number,
    isASC: Toggle,
    postTypes: PostType[],
  ) => {
    setLoading(true)
    const res = await Request.Post.RetrieveAll(page, capacity, isASC, postTypes)
    setLoading(false)
    if (res?.data && res?.code === 0) {
      const data = res.data
      const maxPage = Math.ceil(data.total / capacity)
      setTotal(data.total)
      setMaxPage(maxPage)
      setPosts(res.data.posts)
      scrollIntoTop()
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

  useActivate(() => {
    void RetrieveAll(page, capacity, isASC, postTypes)
  })

  return {
    loading,
    page,
    total,
    capacity,
    maxPage,
    isASC,
    postTypes,
    posts,
    RetrieveAll,
  }
}
