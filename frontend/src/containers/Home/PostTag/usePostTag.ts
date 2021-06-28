import { RouteName } from '@/routes'
import { store } from '@/store'
import Request from '@/utils/Request'
import { PostTag } from '@/utils/Request/PostTag'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { scrollIntoTop } from '@/utils/tools'

export default () => {
  const dispatch = useSelector(() => store.dispatch.common)

  const [tags, setTags] = useState<PostTag[]>([])
  const [loading, setLoading] = useState(true)

  const RetrieveAll = async () => {
    setLoading(true)
    const res = await Request.PostTag.RetrieveAll()
    scrollIntoTop()
    setLoading(false)
    if (res?.data) {
      setTags(res.data)
    }
  }

  useEffect(() => {
    void RetrieveAll()
    dispatch.SET_APPBAR_TITLE(RouteName.POST_TAG)
  }, [])

  return {
    tags,
    loading,
  }
}
