import { useState } from 'react'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'

export default () => {
  const state = useSelector((state: RootState) => state.momentDetailAdmin)
  const dispatch = useSelector(() => store.dispatch.momentDetailAdmin)
  const [openAction, setOpenAction] = useState(true)

  const setMoment = dispatch.SET_MOMENT

  const handleOpenAction = () => {
    setOpenAction(!openAction)
  }

  return {
    state,
    dispatch,
    openAction,
    setMoment,
    handleOpenAction,
  }
}
