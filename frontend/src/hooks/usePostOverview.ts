import { Request } from '@/utils'
import { PostType, Toggle } from '@/utils/Request/Post'
import { useEffect, useState } from 'react'
import * as H from 'history'
// import { useActivate } from 'react-activation'
import { isDef, scrollIntoTop } from '@/utils/tools'
import { store } from '@/store'
import { useSelector } from 'react-redux'
import { PathName, RouteName } from '@/routes'
import { useHistory } from 'react-router-dom'
import { useRequest } from 'ahooks'

export const usePostOverview = ({
  location,
  _postTypes,
}: {
  location: H.Location<unknown>
  _postTypes: PostType[]
}) => {
  const dispatch = useSelector(() => store.dispatch.common)
  const query = new URLSearchParams(location.search)
  const history = useHistory()

  const _POST_TYPES = (query.getAll('postTypes') as unknown) as PostType[]
  const page = Number(query.get('page')) || 1
  const capacity = Number(query.get('capacity')) || 5
  const isASC = (Number(query.get('isASC')) as unknown) as Toggle
  const postTypes: PostType[] = _POST_TYPES?.length ? _POST_TYPES : _postTypes

  const [form, setForm] = useState({
    page,
    capacity,
    isASC,
    postTypes,
  })

  const { run, data, loading } = useRequest(
    async () => {
      const res = await Request.Post.RetrieveAll(form)
      const { capacity, page } = form
      if (res?.data) {
        const data = res.data
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
    dispatch.SET_APPBAR_TITLE(RouteName.POST)
  }, [])

  useEffect(() => {
    setForm({
      page,
      capacity,
      isASC,
      postTypes,
    })
  }, [location.search])

  useEffect(() => {
    run()
  }, [form])

  // 生成query-params
  const paginationQuery = new URLSearchParams()
  query.set('capacity', String(form.capacity))
  query.set('isASC', String(form.isASC))
  form.postTypes.forEach((postType) => query.set('postType', String(postType)))

  return {
    ...(data || {
      total: 0,
      maxPage: 1,
      posts: [],
    }),
    page: form.page,
    loading,
    paginationQuery,
  }
}
