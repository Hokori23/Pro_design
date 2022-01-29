import { RouteName } from '@/routes'
import { store } from '@/store'
import Request from '@/utils/Request'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRequest } from 'ahooks'
import { scrollIntoTop } from '@/utils/tools'

export default () => {
  const dispatch = useSelector(() => store.dispatch.common)

  const { loading, data, run } = useRequest(
    async () => {
      const res = await Request.PostTag.RetrieveAll()
      scrollIntoTop('start', 'auto')
      return res
    },
    {
      manual: true,
    },
  )

  useEffect(() => {
    void run()
    dispatch.SET_APPBAR_TITLE(RouteName.POST_TAG)
  }, [])

  return {
    tags: data?.data,
    loading,
  }
}
