import { useEffect, createRef } from 'react'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'
import { scrollIntoTop } from '@/utils/tools'
import { useParams } from 'react-router-dom'
// import { useActivate } from 'react-activation'

export default () => {
  const state = useSelector((state: RootState) => state.postDetail)
  const dispatch = useSelector(() => store.dispatch.postDetail)
  const { id } = useParams<{ id: string }>()
  const ref = createRef()

  useEffect(() => {
    scrollIntoTop()
    // 初始化
    void dispatch.RetrievePost(id)
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
