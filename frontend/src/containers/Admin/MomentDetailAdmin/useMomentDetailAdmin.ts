import { useParams } from 'react-router-dom'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'
import { scrollIntoTop } from '@/utils/tools'
import { RouteName } from '@/routes'
import { useAsync } from 'react-use'
import _ from 'lodash'
import { defaultMoment } from './model'
import { Post } from '@/utils/Request/Post'

export default () => {
  const state = useSelector((state: RootState) => state.momentDetailAdmin)
  const commonDispatch = useSelector(() => store.dispatch.common)
  const dispatch = useSelector(() => store.dispatch.momentDetailAdmin)
  const { id } = useParams<{ id: string }>()

  const Init = async () => {
    scrollIntoTop()
    // 初始化
    commonDispatch.SET_APPBAR_TITLE(`撰写${RouteName.MOMENT_DETAIL_ADMIN}`)
    if (id) {
      const moment = await dispatch.RetrieveMoment(id)
      if (moment) {
        dispatch.SET_MOMENT(moment)
        dispatch.SET_IS_NEW(false)
      }
    } else {
      dispatch.SET_MOMENT({ ..._.cloneDeep(defaultMoment) })
      dispatch.SET_IS_NEW(true)
      dispatch.SET_LOADING_MOMENT(false)
    }
  }

  const onMomentChange = (moment: Partial<Post>) => {
    dispatch.SET_MOMENT({ ..._.cloneDeep(defaultMoment), ...moment })
  }

  useAsync(Init, [id])

  return {
    state,
    onMomentChange,
  }
}
