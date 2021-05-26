import { useEffect } from 'react'
import { useActivate } from 'react-activation'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'

export default (id: string) => {
  const state = useSelector((state: RootState) => state.postDetail)
  const dispatch = useSelector(() => store.dispatch.postDetail)

  useEffect(() => {
    // 初始化
    void dispatch.RetrievePost(id)
  }, [])

  useActivate(() => {
    // 更新
    void dispatch.RetrievePost(id)
  })
  return {
    loading: state.loadingPost,
    post: state.post,
  }
}