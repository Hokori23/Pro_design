import { PathName, RouteName } from '@/routes'
import { RootState, store } from '@/store'
import Request from '@/utils/Request'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as H from 'history'
import { useAsync } from 'react-use'
import { useParams } from 'react-router-dom'
import { User } from '@/utils/Request/User'
import { useRequest } from 'ahooks'

export default (history: H.History<unknown>) => {
  const state = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.common)
  const { id } = useParams<{ id: string }>()
  const { loading, runAsync } = useRequest(Request.User.Retrieve, {
    manual: true,
  })
  const [user, setUser] = useState<User>()

  useEffect(() => {
    if (user?.userName) {
      dispatch.SET_APPBAR_TITLE(user.userName)
    } else {
      dispatch.SET_APPBAR_TITLE(RouteName.USER)
    }
  }, [user?.userName])

  useAsync(async () => {
    if (Number(id) === state.userInfo.id) {
      // 重定向到用户中心
      history.replace(PathName.USER)
      return
    }
    if (id === '2') {
      // TODO: 跳过游客账号
      history.replace(PathName.NOT_FOUND_PAGE)
      return
    }
    const res = await runAsync(Number(id))
    if (res?.data) {
      setUser(res.data)
    }
  })
  return {
    loading,
    user,
  }
}
