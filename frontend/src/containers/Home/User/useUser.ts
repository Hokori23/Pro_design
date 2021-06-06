import { RouteName } from '@/routes'
import { RootState, store } from '@/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default () => {
  const state = useSelector((state: RootState) => state.common)
  const { userInfo, isLogin } = state
  const dispatch = useSelector(() => store.dispatch.common)

  const [avatarLoading, setAvatarLoading] = useState(false)

  useEffect(() => {
    dispatch.SET_APPBAR_TITLE(RouteName.USER)
  }, [])

  const handleImgUpload = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    // const { name, size } = file
    const { size } = file
    if (size > 1024 * 1024) {
      dispatch.SET_AXIOS_SNACK_BAR({
        message: '请选择小于1MB的图片',
        open: true,
      })
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    setAvatarLoading(true)
    // const res = await dispatch.uploadImage({ fileName: name, formData })
    // if (!res || res.code !== 200) {
    //   setLoading(false)
    //   return
    // }

    // 更改用户信息
    // const user = JSON.parse(JSON.stringify(userInfo))
    // user.avatar_url = `${UPYUN_URL}${res.url as string}`
    // await dispatch.editUserInfo(user)

    // TODO: DEBUG
    setTimeout(() => {
      setAvatarLoading(false)
    }, 3000)
    setAvatarLoading(false)
  }
  return { userInfo, isLogin, avatarLoading, handleImgUpload }
}
