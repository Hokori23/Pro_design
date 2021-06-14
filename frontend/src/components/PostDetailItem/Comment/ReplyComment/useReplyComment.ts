import { RootState, store } from '@/store'
import { useEffect, useState } from 'react'
import { formValid, FormValidProps } from '@/components/UserFormValid'
import { useSelector } from 'react-redux'
import Request from '@/utils/Request'
import { FormattedPostComment } from '@/utils/Request/PostComment'
import { scrollTo } from '@/utils/tools'

export default (
  id: string,
  postId: number,
  root: FormattedPostComment,
  parent?: FormattedPostComment,
) => {
  const state = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.postDetail)
  const commonDispatch = useSelector(() => store.dispatch.common)

  const Retrieve = dispatch.RetrievePost
  const { isLogin, userInfo } = state
  const [isLoading, setIsLoading] = useState(false)
  const pid = postId
  const uid = isLogin ? (userInfo.id as number | undefined) : -1
  const [comment, setComment] = useState('')
  const [email, setEmail] = useState(isLogin ? userInfo.email : '')
  const [url, setUrl] = useState(isLogin ? userInfo.url : '')
  const [emailError, setEmailError] = useState({ text: '', error: false })
  const [commentError, setCommentError] = useState({ text: '', error: false })
  const [urlError, setUrlError] = useState({ text: '', error: false })
  const userAgent = window.navigator.userAgent

  const onSubmit = async () => {
    const validProps: FormValidProps = {
      email: {
        value: email,
        errorSetter: setEmailError,
      },
      comment: {
        value: comment,
        errorSetter: setCommentError,
      },
    }
    if (url) {
      validProps.url = {
        value: url,
        errorSetter: setUrlError,
      }
    }
    if (formValid(validProps)) {
      setIsLoading(true)
      dispatch.SET_LOADING_COMMENT(true)
      const payload: { [key: string]: any } = {
        pid,
        uid,
        rootId: root.id,
        content: comment,
        email,
        url,
        userAgent,
      }
      if (parent) {
        payload.parentId = parent.id
      }
      const res = await Request.PostComment.Create(payload)
      if (res?.data) {
        await Retrieve(String(postId))
        commonDispatch.SET_AXIOS_SNACK_BAR({
          autoHideDuration: 3000,
          message: res.message,
          open: true,
        })
        setComment('')
        scrollTo(id)
      }
      setIsLoading(false)
      dispatch.SET_LOADING_COMMENT(false)
    }
  }

  useEffect(() => {
    setComment('')
  }, [parent])

  return {
    isLogin,
    isLoading,
    comment,
    setComment,
    url,
    setUrl,
    email,
    setEmail,
    commentError,
    setCommentError,
    emailError,
    setEmailError,
    urlError,
    setUrlError,
    onSubmit,
  }
}
