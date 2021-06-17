import { useEffect, useState } from 'react'
import { Option } from '@/utils/Request/Option'
import { useAsync } from 'react-use'
import { PathName, RouteName } from '@/routes'
import { store } from '@/store'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Request from '@/utils/Request'

export default (isDeskTopSize: boolean) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [blogConfig, setBlogConfig] = useState([] as Option[])
  const dispatch = useSelector(() => store.dispatch.common)
  const location = useLocation()

  useAsync(async () => {
    const res = await Request.Option.RetrieveAll()
    if (res?.data) {
      dispatch.SET_BLOG_CONFIG(res.data)
      setBlogConfig(res.data)
    }
  })

  useEffect(() => {
    location.pathname === PathName.ADMIN &&
      dispatch.SET_APPBAR_TITLE(RouteName.ADMIN)
  }, [location.pathname])

  useEffect(() => {
    setDrawerOpen(isDeskTopSize)
  }, [isDeskTopSize])

  useEffect(() => {
    void dispatch.checkLogin()
  }, [])

  return {
    drawerOpen,
    setDrawerOpen,
    blogConfig,
  }
}
