import { RootState, store } from '@/store'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default () => {
  const state = useSelector((state: RootState) => state.postDetailAdmin)
  const dispatch = useSelector(() => store.dispatch.postDetailAdmin)
  const [openEditor, setOpenEditor] = useState(true)

  const handleOpenEditor = () => {
    setOpenEditor(!openEditor)
  }
  const handleMdContentChange: (
    data: {
      text: string
      html: string
    },
    event?: React.ChangeEvent<HTMLTextAreaElement> | undefined,
  ) => void = ({ text }) => {
    dispatch.SET_POST({
      ...state.post,
      content: text,
    })
  }
  const { title, coverUrl, content } = state.post

  return {
    title,
    coverUrl,
    content,
    openEditor,
    handleOpenEditor,
    handleMdContentChange,
  }
}
