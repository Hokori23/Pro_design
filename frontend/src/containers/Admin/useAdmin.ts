import { useEffect, useState } from 'react'
import { Option } from '@/utils/Request/Option'
import { useAsync } from 'react-use'
import useInit from '@/containers/Home/useInit'
import { RouteName } from '@/routes'
import { store } from '@/store'
import { useSelector } from 'react-redux'

export default (isDeskTopSize: boolean) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [blogConfig, setBlogConfig] = useState([] as Option[])

  useAsync(async () => {
    const { blogConfig } = await useInit()
    if (blogConfig) {
      setBlogConfig(blogConfig)
    }
  })
  const dispatch = useSelector(() => store.dispatch.common)
  useEffect(() => {
    dispatch.SET_APPBAR_TITLE(RouteName.ADMIN)
  }, [])

  useEffect(() => {
    setDrawerOpen(isDeskTopSize)
  }, [isDeskTopSize])

  return {
    drawerOpen,
    setDrawerOpen,
    blogConfig,
  }
}
