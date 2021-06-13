import { useParams } from 'react-router-dom'
import { createRef, useEffect } from 'react'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'
import { scrollIntoTop } from '@/utils/tools'
import { RouteName } from '@/routes'
import { useAsync } from 'react-use'
import { defaultPost } from './model'
import _ from 'lodash'

export default () => {
  const state = useSelector((state: RootState) => state.postDetailAdmin)
  const commonState = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.postDetailAdmin)
  const commonDispatch = useSelector(() => store.dispatch.common)
  const { id } = useParams<{ id: string }>()
  const ref = createRef()

  const Init = async () => {
    scrollIntoTop()
    // 初始化
    if (id) {
      const post = await dispatch.RetrievePost(id)
      if (post) {
        void dispatch.RetrieveTagAll()
        post.uid = commonState.userInfo.id as number
        dispatch.SET_POST(post)
        dispatch.SET_RENDER_POST(post)
        dispatch.SET_IS_NEW(false)
      }
    } else {
      void dispatch.RetrieveTagAll()
      defaultPost.uid = commonState.userInfo.id as number
      dispatch.SET_POST({ ..._.cloneDeep(defaultPost) })
      dispatch.SET_RENDER_POST({
        ..._.cloneDeep(defaultPost),
      })
      dispatch.SET_IS_NEW(true)
      dispatch.SET_LOADING_POST(false)
    }
  }

  useEffect(() => {
    if (id) {
      commonDispatch.SET_APPBAR_TITLE(`编辑 - ${state.post.title as string}`)
    } else {
      commonDispatch.SET_APPBAR_TITLE(`撰写${RouteName.POST_DETAIL_ADMIN}`)
    }
  }, [state.post.title])

  useAsync(Init, [id])

  return {
    ref,
    state,
  }
}
