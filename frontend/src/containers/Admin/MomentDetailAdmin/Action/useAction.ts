import { useState } from 'react'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { defaultMoment } from '../model'
import { Post } from '@/utils/Request/Post'

export default () => {
  const state = useSelector((state: RootState) => state.momentDetailAdmin)
  const dispatch = useSelector(() => store.dispatch.momentDetailAdmin)

  const [open, setOpen] = useState(true)
  const handleOpen = () => {
    setOpen(!open)
  }
  const onMomentChange = (moment: Partial<Post>) => {
    dispatch.SET_MOMENT({ ..._.cloneDeep(defaultMoment), ...moment })
  }

  return {
    state,
    open,
    handleOpen,
    onMomentChange,
  }
}
