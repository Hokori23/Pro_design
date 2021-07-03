import { useState } from 'react'
import { RootState, store } from '@/store'
import { UPYUN_URL } from '@/utils/const'
import { FileType } from '@/utils/Request/Upload'
import { Upload } from '@/utils/Request'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { CodeDictionary } from '@/utils/Request/type'

export default () => {
  const state = useSelector((state: RootState) => state.postDetailAdmin)
  const dispatch = useSelector(() => store.dispatch.postDetailAdmin)
  const commonDispatch = useSelector(() => store.dispatch.common)
  const [openAction, setOpenAction] = useState(true)
  const [titleError, setTitleError] = useState({
    error: false,
    text: '',
  })
  const [coverUrlError, setCoverUrlError] = useState({
    error: false,
    text: '',
  })

  const handleOpenAction = () => {
    setOpenAction(!openAction)
  }

  const onTagChange = (checked: boolean, idx: number) => {
    const clonedTags = _.cloneDeep(state.tags)
    clonedTags[idx].checked = checked
    dispatch._SET_TAGS(clonedTags)
  }

  const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const { name, size } = file
    if (size > 1024 * 1024 * 5) {
      commonDispatch.SET_AXIOS_SNACK_BAR({
        message: '请选择小于5MB的图片',
        type: 'warning',
        open: true,
      })
      return
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
        message: '上传文章主图失败',
        type: 'error',
        open: true,
      })
    } else {
      dispatch.SET_POST({
        ..._.cloneDeep(state.post),
        coverUrl: `${UPYUN_URL}${uploadRes.url}`,
      })
    }
  }

  return {
    state,
    dispatch,
    openAction,
    titleError,
    coverUrlError,
    setTitleError,
    setCoverUrlError,
    handleOpenAction,
    onTagChange,
    handleImgUpload,
  }
}
