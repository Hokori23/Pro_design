import { useParams } from 'react-router-dom'
import { createRef } from 'react'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'
import { scrollIntoTop } from '@/utils/tools'
import { RouteName } from '@/routes'
import { useAsync } from 'react-use'
import { defaultPostDetailAdminState } from './model'
import _ from 'lodash'

export default () => {
  const state = useSelector((state: RootState) => state.postDetailAdmin)
  const commonDispatch = useSelector(() => store.dispatch.common)
  const dispatch = useSelector(() => store.dispatch.postDetailAdmin)
  const { id } = useParams<{ id: string }>()
  const ref = createRef()

  const Init = async () => {
    scrollIntoTop()
    // 初始化
    commonDispatch.SET_APPBAR_TITLE(`撰写${RouteName.POST_DETAIL_ADMIN}`)
    if (id) {
      const post = await dispatch.RetrievePost(id)
      if (post) {
        commonDispatch.SET_APPBAR_TITLE(`编辑 - ${post.title as string}`)
        dispatch.SET_POST(post)
        dispatch.SET_IS_NEW(false)
        void dispatch.RetrieveTagAll()
      }
    } else {
      dispatch.SET_POST({ ..._.cloneDeep(defaultPostDetailAdminState.post) })
      dispatch.SET_TAGS([])
      dispatch.SET_IS_NEW(true)
    }
  }
  useAsync(Init, [id])

  return {
    ref,
    state,
  }
}
