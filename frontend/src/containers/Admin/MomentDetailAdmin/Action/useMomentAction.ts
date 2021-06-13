import { useState } from 'react'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default () => {
  const state = useSelector((state: RootState) => state.momentDetailAdmin)
  const dispatch = useSelector(() => store.dispatch.momentDetailAdmin)
  const history = useHistory()

  const [deleteDialog, setDeleteDialog] = useState(false)

  const handleDialogClose = () => {
    setDeleteDialog(false)
  }

  return {
    state,
    dispatch,
    history,
    deleteDialog,
    setDeleteDialog,
    handleDialogClose,
  }
}
