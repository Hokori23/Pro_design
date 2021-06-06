import { RouteName } from '@/routes'
import { RootState, store } from '@/store'
import { UPYUN_URL } from '@/utils/const'
import { Upload, User } from '@/utils/Request'
import { FileType } from '@/utils/Request/Upload'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

export default () => {
  const state = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.common)
  const { userInfo, isLogin } = state

  const [avatarLoading, setAvatarLoading] = useState(false)

  useEffect(() => {
    dispatch.SET_APPBAR_TITLE(RouteName.USER)
  }, [])

  const handleImgUpload = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    const { name, size } = file
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
    const uploadRes = await Upload.handleUpload(
      { fileName: name, formData },
      FileType.IMAGE,
    )
    if (!uploadRes || uploadRes.code !== 200) {
      setAvatarLoading(false)
      dispatch.SET_AXIOS_SNACK_BAR({
        message: '上传头像失败',
        open: true,
      })
      return
    }

    // 更改用户信息
    const user = _.cloneDeep(state.userInfo)
    user.avatarUrl = `${UPYUN_URL}${uploadRes.url}`
    const editUserRes = await User.Edit(user)
    setAvatarLoading(false)
    if (editUserRes) {
      dispatch.SET_USER_INFO(editUserRes)
    } else {
      dispatch.SET_AXIOS_SNACK_BAR({
        message: '上传头像失败',
        open: true,
      })
    }
  }
  return { userInfo, isLogin, avatarLoading, handleImgUpload }
}
