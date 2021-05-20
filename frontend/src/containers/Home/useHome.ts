import { useEffect, useState } from 'react'
import { Option } from '@/utils/Request/Option'
import { isDef } from '@/utils/tools'
import { useAsync } from 'react-use'
import useInit from './useInit'
import * as H from 'history'
import { TabProps } from '@/containers/Home/Navigation'
import { PathName } from '@/routes'

export default (location: H.Location<unknown>) => {
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
    const { blogConfig } = await useInit()
    if (isDef(blogConfig)) {
      setBlogConfig(blogConfig)
    }
  })

  useEffect(() => {
    const idx = tabs.findIndex((v) => location.pathname.startsWith(v.path))
    setCurTabIdx(idx === -1 ? 0 : idx)
  }, [location.pathname])
  return {
    drawerOpen,
    setDrawerOpen,
    blogConfig,
    tabs,
    curTabIdx,
    setCurTabIdx,
  }
}
