import { createRef } from 'react'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'
import { scrollIntoTop } from '@/utils/tools'
import { useParams } from 'react-router-dom'
import { useAsync } from 'react-use'
// import { useActivate } from 'react-activation'

export default () => {
  const state = useSelector((state: RootState) => state.postDetail)
  const commonDispatch = useSelector(() => store.dispatch.common)
  const dispatch = useSelector(() => store.dispatch.postDetail)
  const { id } = useParams<{ id: string }>()
  const ref = createRef()

  useAsync(async () => {
    scrollIntoTop()
    // 初始化
    const post = await dispatch.RetrievePost(id)
    if (post) {
      commonDispatch.SET_APPBAR_TITLE(post.title as string)
    }
  }, [])

  // useActivate(() => {
  //   // 更新
  //   void dispatch.RetrievePost(id)
  // })
  return {
    loading: state.loadingPost,
    post: state.post,
    ref,
    state,
  }
}
