import { RootState, store } from '@/store'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Upload } from '@/utils/Request'
import { CodeDictionary } from '@/utils/Request/type'
import { UPYUN_URL } from '@/utils/const'
import { FileType } from '@/utils/Request/Upload'

export default () => {
  const state = useSelector((state: RootState) => state.postDetailAdmin)
  const dispatch = useSelector(() => store.dispatch.postDetailAdmin)
  const commonDispatch = useSelector(() => store.dispatch.common)
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
  const handleImgUpload = async (file: File) => {
    const { name, size } = file
    if (size > 1024 * 1024 * 20) {
      commonDispatch.SET_AXIOS_SNACK_BAR({
        message: '请选择小于20MB的图片',
        type: 'warning',
        open: true,
      })
      return ''
    }
    const formData = new FormData()
    formData.append('file', file)
    dispatch.SET_BACKDROP_LOADING(true)
    const uploadRes = await Upload.handleUpload(
      { fileName: name, formData },
      FileType.IMAGE,
    )
    dispatch.SET_BACKDROP_LOADING(false)
    if (!uploadRes || uploadRes.code !== CodeDictionary.UPYUN_SUCCESS) {
      commonDispatch.SET_AXIOS_SNACK_BAR({
        message: '上传图片失败',
        type: 'error',
        open: true,
      })
      return ''
    }

    return `${UPYUN_URL}${uploadRes.url}`
  }
  const { title, coverUrl, content } = state.post

  return {
    title,
    coverUrl,
    content,
    openEditor,
    handleOpenEditor,
    handleMdContentChange,
    handleImgUpload,
  }
}
