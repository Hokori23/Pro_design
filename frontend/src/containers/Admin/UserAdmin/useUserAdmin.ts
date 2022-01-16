import { Request } from '@/utils'
import { useEffect, useState } from 'react'
import { scrollIntoTop } from '@/utils/tools'
import { store } from '@/store'
import { useSelector } from 'react-redux'
import { RouteName } from '@/routes'
import { User } from '@/utils/Request/User'

export default () => {
  const dispatch = useSelector(() => store.dispatch.common)

  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([] as User[])
  const [pageSize, setPageSize] = useState(10)
  const rowsPerPageOptions = [10, 15, 30]

  const RetrieveAll = async () => {
    setLoading(true)
    const res = await Request.User.RetrieveAll()
    setLoading(false)
    if (res?.data) {
      scrollIntoTop()
      setUsers(res.data)
    }
  }

  useEffect(() => {
    dispatch.SET_APPBAR_TITLE(`管理${RouteName.USER_ADMIN}`)
    void RetrieveAll()
  }, [])

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
  }

  return {
    loading,
    users,
    pageSize,
    rowsPerPageOptions,
    handlePageSizeChange,
  }
}
