import { RootState, store } from '@/store'
import _ from 'lodash'
import { useEffect, useState } from 'react'
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
    dispatch.SET_RENDER_POST({
      ..._.cloneDeep(state.renderPost),
      content: text,
    })
  }
  const { title, coverUrl, content } = state.post

  useEffect(() => {
    // 曲线解决Editor只依赖于value触发更新的问题
    if (state.loadingPost) return
    dispatch.SET_RENDER_POST({
      ..._.cloneDeep(state.post),
      content: content + ' ',
    })
    void Promise.resolve().then(() => {
      dispatch.SET_RENDER_POST({ ..._.cloneDeep(state.post), content })
    })
  }, [title, coverUrl])

  return {
    title: state.renderPost.title,
    coverUrl: state.renderPost.coverUrl,
    content: state.renderPost.content,
    openEditor,
    handleOpenEditor,
    handleMdContentChange,
  }
}
