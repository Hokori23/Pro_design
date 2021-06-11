import { useState } from 'react'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'

export default () => {
  const state = useSelector((state: RootState) => state.postDetailAdmin)
  const dispatch = useSelector(() => store.dispatch.postDetailAdmin)
  const [openAction, setOpenAction] = useState(true)

  const setPost = dispatch.SET_POST

  const handleOpenAction = () => {
    setOpenAction(!openAction)
  }

  return {
    state,
    dispatch,
    openAction,
    setPost,
    handleOpenAction,
  }
}
