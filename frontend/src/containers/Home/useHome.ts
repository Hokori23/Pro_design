import { useEffect, useState } from 'react'
import { Option } from '@/utils/Request/Option'
import { useAsync } from 'react-use'
import * as H from 'history'
import { TabProps } from '@/containers/Home/Navigation'
import { PathName } from '@/routes'
import { useSelector } from 'react-redux'
import { RootState, store } from '@/store'
import Request from '@/utils/Request'

export default (location: H.Location<unknown>, isDeskTopSize: boolean) => {
  const state = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.common)
  const tabs: TabProps[] = [
    {
      text: '首页',
      path: PathName.HOME,
    },
    {
      text: '文章',
      path: PathName.POST_OVERVIEW,
    },
    {
      text: '说说',
      path: PathName.MOMENT_OVERVIEW,
    },
  ]
  const idx = tabs.findIndex((v) => location.pathname.startsWith(v.path))

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [blogConfig, setBlogConfig] = useState([] as Option[])
  const [curTabIdx, setCurTabIdx] = useState(idx === -1 ? 0 : idx)

  useAsync(async () => {
    const res = await Request.Option.RetrieveAll()
    if (res?.data) {
      dispatch.SET_BLOG_CONFIG(res.data)
      setBlogConfig(res.data)
    }
  })

  useEffect(() => {
    const idx = tabs.findIndex((v) => location.pathname.startsWith(v.path))
    setCurTabIdx(idx === -1 ? 0 : idx)
  }, [location.pathname])

  useEffect(() => {
    setDrawerOpen(isDeskTopSize)
  }, [isDeskTopSize])

  useEffect(() => {
    // TODO: offline mock
    void dispatch.checkLogin()
  }, [])

  return {
    state,
    drawerOpen,
    setDrawerOpen,
    blogConfig,
    tabs,
    curTabIdx,
    setCurTabIdx,
  }
}
