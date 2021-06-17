import { PathName, RouteName } from '@/routes'
import { store } from '@/store'
import Request from '@/utils/Request'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { useAsync } from 'react-use'
import { Mail } from '@/utils/Request/Mail'
import { useHistory, useParams } from 'react-router-dom'
import { User } from '@/utils/Request/User'
import moment from 'moment'

interface EditDialogProps {
  open: boolean
  title: string
  attr: keyof User
  valid: boolean
  content?: string
}
const defaultEditDialogProps: EditDialogProps = {
  open: false,
  title: '',
  attr: 'userName',
  valid: true,
  content: '',
}
export default () => {
  const dispatch = useSelector(() => store.dispatch.common)
  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  const [user, setUser] = useState<Partial<User> | null>(null)
  const [clonedUserInfo, setClonedUserInfo] = useState<Partial<User> | null>(
    null,
  )
  const [userLoading, setUserLoading] = useState(false)
  const [editDialog, setEditDialog] = useState(defaultEditDialogProps)
  const [mailLoading, setMailLoading] = useState(true)
  const [mail, setMail] = useState<Mail | null>(null)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [deletingUser, setDeletingUser] = useState(false)

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
    if (!clonedUserInfo) return
    const newUser = _.cloneDeep(clonedUserInfo)
    setUserLoading(true)
    const res = await Request.User.Edit__Admin(newUser)
    setUserLoading(false)
    if (res?.data) {
      setUser(res.data)
      setClonedUserInfo(_.cloneDeep(res.data))
      handleEditDialogClose()
    }
  }

  const RetrieveMail = async () => {
    setMailLoading(true)
    const res = await Request.Mail.Retrieve__Admin(Number(id))
    setMailLoading(false)
    if (res?.data) {
      setMail(res.data)
    }
  }

  const handleEditMail = async () => {
    if (!mail) return
    const newMail = { ...mail, isSubscribed: !mail.isSubscribed }
    setMailLoading(true)
    const res = await Request.Mail.Edit__Admin(newMail)
    if (res?.data) {
      setMail(res.data)
      dispatch.SET_AXIOS_SNACK_BAR({
        message: res.message,
        open: true,
      })
    }
    setMailLoading(false)
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialog(false)
  }
  const handleDeleteUser = async () => {
    setDeletingUser(true)
    const res = await Request.User.Delete__Admin(Number(user?.id))
    setDeletingUser(false)
    if (res?.code === 0) {
      dispatch.SET_AXIOS_SNACK_BAR({
        message: res.message,
        open: true,
      })
      history.push(PathName.USER_ADMIN)
    }
  }

  useEffect(() => {
    dispatch.SET_APPBAR_TITLE(`编辑${RouteName.USER_DETAIL_ADMIN}`)
  }, [])

  useAsync(async () => {
    void RetrieveMail()
    const res = await Request.User.Retrieve(Number(id))
    if (res?.data) {
      setUser(res.data)
      setClonedUserInfo(_.cloneDeep(res.data))
    }
  })
  return {
    user,
    userUpdatedAt: moment(user?.updatedAt),
    clonedUserInfo,
    setClonedUserInfo,
    userLoading,
    editDialog,
    mailLoading,
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
  }
}
