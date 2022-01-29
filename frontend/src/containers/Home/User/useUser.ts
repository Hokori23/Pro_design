import { PathName, RouteName } from '@/routes'
import { RootState, store } from '@/store'
import { UPYUN_URL } from '@/utils/const'
import Request, { Upload, User } from '@/utils/Request'
import { FileType } from '@/utils/Request/Upload'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { cloneDeep } from 'lodash-es'
import { useAsync } from 'react-use'
import { Mail } from '@/utils/Request/Mail'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { useRequest } from 'ahooks'

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
  const history = useHistory()
  const { userInfo, isLogin } = state

  const [avatarLoading, setAvatarLoading] = useState(false)
  const [clonedUserInfo, setClonedUserInfo] = useState(cloneDeep(userInfo))
  const { loading: userLoading, ...editUserService } = useRequest(User.Edit, {
    manual: true,
  })
  const editMailService = useRequest(Request.Mail.Edit, {
    manual: true,
  })
  const retrieveMailService = useRequest(Request.Mail.Retrieve, {
    manual: true,
  })
  const [editDialog, setEditDialog] = useState(defaultEditDialogProps)
  const [mail, setMail] = useState<Mail>({
    id: -1,
    uid: userInfo.id as number,
    isSubscribed: false,
  })
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [deletingUser, setDeletingUser] = useState(false)

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
    const user = cloneDeep(state.userInfo)
    user.avatarUrl = `${UPYUN_URL}${uploadRes.url}`
    const editUserRes = await editUserService.runAsync(user)
    setAvatarLoading(false)
    if (!editUserRes) {
      dispatch.SET_AXIOS_SNACK_BAR({
        message: '上传头像失败',
        type: 'error',
        open: true,
      })
    } else {
      setClonedUserInfo(editUserRes)
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
    const newUser = cloneDeep(clonedUserInfo)
    const res = await editUserService.runAsync(newUser)
    if (res) {
      setClonedUserInfo(res)
      handleEditDialogClose()
    }
  }

  const RetrieveMail = async () => {
    const res = await retrieveMailService.runAsync()
    if (res?.data) {
      setMail(res.data)
    }
  }

  const handleEditMail = async () => {
    if (mail.id === -1) return
    const newMail = { ...mail, isSubscribed: !mail.isSubscribed }
    const res = await editMailService.runAsync(newMail)
    if (res?.data) {
      setMail(newMail)
      dispatch.SET_AXIOS_SNACK_BAR({
        message: res.message,
        open: true,
      })
    }
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialog(false)
  }
  const handleDeleteUser = async () => {
    setDeletingUser(true)
    const res = await User.Delete()
    setDeletingUser(false)
    if (res?.code === 0) {
      dispatch.SET_AXIOS_SNACK_BAR({
        message: res.message,
        open: true,
      })
      dispatch.LOGOUT()
      history.push(PathName.HOME)
    }
  }

  useEffect(() => {
    dispatch.SET_APPBAR_TITLE(RouteName.USER)
  }, [])

  useAsync(async () => {
    if (!isLogin) return
    void RetrieveMail()
    const res = await User.Retrieve(Number(userInfo.id))
    if (res?.data) {
      dispatch.SET_USER_INFO(res.data)
    }
  })
  return {
    userInfo,
    userUpdatedAt: moment(userInfo?.updatedAt),
    clonedUserInfo,
    setClonedUserInfo,
    isLogin,
    avatarLoading,
    userLoading,
    editDialog,
    mailLoading: editMailService.loading || retrieveMailService.loading,
    mail,
    mailUpdatedAt: moment(mail?.updatedAt),
    deleteDialog,
    deletingUser,
    handleEditMail,
    setDeleteDialog,
    handleDeleteDialogClose,
    handleDeleteUser,
    handleEditDialogClose,
    handleEditDialogOpen,
    handleEditDialogValid,
    handleEditDialogSubmit,
    handleImgUpload,
  }
}
