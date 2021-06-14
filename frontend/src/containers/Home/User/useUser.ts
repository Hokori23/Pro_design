import { RouteName } from '@/routes'
import { RootState, store } from '@/store'
import { UPYUN_URL } from '@/utils/const'
import { Upload, User } from '@/utils/Request'
import { FileType } from '@/utils/Request/Upload'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { useAsync } from 'react-use'

interface EditDialogProps {
  open: boolean
  title: string
  attr: keyof User.User
  valid: boolean
  content?: string
  input?: any
}
const defaultEditDialogProps: EditDialogProps = {
  open: false,
  title: '',
  attr: 'userName',
  valid: true,
  content: '',
  input: '',
}
export default () => {
  const state = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.common)
  const { userInfo, isLogin } = state

  const [avatarLoading, setAvatarLoading] = useState(false)
  const [clonedUserInfo, setClonedUserInfo] = useState(_.cloneDeep(userInfo))
  const [userLoading, setUserLoading] = useState(false)
  const [editDialog, setEditDialog] = useState(defaultEditDialogProps)

  const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const { name, size } = file
    if (size > 1024 * 1024) {
      dispatch.SET_AXIOS_SNACK_BAR({
        message: '请选择小于1MB的图片',
        type: 'warning',
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
        type: 'error',
        open: true,
      })
      return
    }

    // 更改用户信息
    const user = _.cloneDeep(state.userInfo)
    user.avatarUrl = `${UPYUN_URL}${uploadRes.url}`
    const editUserRes = await User.Edit(user)
    setAvatarLoading(false)
    if (!editUserRes) {
      dispatch.SET_AXIOS_SNACK_BAR({
        message: '上传头像失败',
        type: 'error',
        open: true,
      })
    }
  }

  const handleEditDialogClose = () => {
    setEditDialog({
      ...editDialog,
      open: false,
    })
  }

  const handleEditDialogOpen = (
    props: Omit<Omit<EditDialogProps, 'open'>, 'valid'>,
  ) => {
    setEditDialog({ ...defaultEditDialogProps, ...props, open: true })
  }

  const handleEditDialogValid = (valid: boolean) => {
    setEditDialog({ ...editDialog, valid })
  }

  const handleEditDialogSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    const newUser = _.cloneDeep(clonedUserInfo)
    setUserLoading(true)
    const res = await User.Edit(newUser)
    setUserLoading(false)
    if (res) {
      setClonedUserInfo(res)
      handleEditDialogClose()
    }
  }

  useEffect(() => {
    dispatch.SET_APPBAR_TITLE(RouteName.USER)
  }, [])

  useAsync(async () => {
    if (!isLogin) return
    const res = await User.Retrieve(Number(userInfo.id))
    if (res?.data) dispatch.SET_USER_INFO(res.data)
  })
  return {
    userInfo,
    clonedUserInfo,
    setClonedUserInfo,
    isLogin,
    avatarLoading,
    userLoading,
    editDialog,
    handleEditDialogClose,
    handleEditDialogOpen,
    handleEditDialogValid,
    handleEditDialogSubmit,
    handleImgUpload,
  }
}
