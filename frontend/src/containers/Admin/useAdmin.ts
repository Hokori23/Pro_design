import { useEffect, useState } from 'react'
import { Option } from '@/utils/Request/Option'
import { useAsync } from 'react-use'
import useInit from '@/containers/Home/useInit'
import { PathName, RouteName } from '@/routes'
import { store } from '@/store'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default (isDeskTopSize: boolean) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [blogConfig, setBlogConfig] = useState([] as Option[])
  const dispatch = useSelector(() => store.dispatch.common)
  const location = useLocation()

  useAsync(async () => {
    const { blogConfig } = await useInit()
    if (blogConfig) {
      setBlogConfig(blogConfig)
    }
  })
  useEffect(() => {
    location.pathname === PathName.ADMIN &&
      dispatch.SET_APPBAR_TITLE(RouteName.ADMIN)
  }, [location.pathname])

  useEffect(() => {
    setDrawerOpen(isDeskTopSize)
  }, [isDeskTopSize])

  return {
    drawerOpen,
    setDrawerOpen,
    blogConfig,
  }
}
