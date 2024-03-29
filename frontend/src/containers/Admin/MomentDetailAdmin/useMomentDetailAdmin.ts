import { useParams } from 'react-router-dom'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'
import { scrollIntoTop } from '@/utils/tools'
import { RouteName } from '@/routes'
import { useAsync } from 'react-use'
import { cloneDeep } from 'lodash-es'
import { defaultMoment } from './model'

export default () => {
  const state = useSelector((state: RootState) => state.momentDetailAdmin)
  const commonState = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.momentDetailAdmin)
  const commonDispatch = useSelector(() => store.dispatch.common)
  const { id } = useParams<{ id: string }>()

  const Init = async () => {
    scrollIntoTop()
    // 初始化
    if (id) {
      commonDispatch.SET_APPBAR_TITLE(`编辑${RouteName.MOMENT_DETAIL_ADMIN}`)
      const moment = await dispatch.RetrieveMoment(id)
      scrollIntoTop()
      if (moment) {
        dispatch.SET_MOMENT({
          ...cloneDeep(moment),
          uid: commonState.userInfo.id as number,
        })
        dispatch.SET_IS_NEW(false)
      }
    } else {
      commonDispatch.SET_APPBAR_TITLE(`撰写${RouteName.MOMENT_DETAIL_ADMIN}`)
      defaultMoment.uid = commonState.userInfo.id as number
      dispatch.SET_MOMENT(cloneDeep(defaultMoment))
      dispatch.SET_IS_NEW(true)
      dispatch.SET_LOADING_MOMENT(false)
    }
  }

  useAsync(Init, [id])

  return {
    state,
  }
}
