import { RootState } from '@/store'
import { Post } from '@/utils/Request/Post'
import { useState } from 'react'
import { formValid, FormValidProps } from '@/components/UserFormValid'
import { useSelector } from 'react-redux'
import Request from '@/utils/Request'
import { scrollIntoBottom } from '@/utils/tools'

export default (post: Post, Retrieve: (id: string) => Promise<void>) => {
  const state = useSelector((state: RootState) => state.common)
  const { isLogin, userInfo } = state
  const [isLoading, setIsLoading] = useState(false)
  const pid = post.id
  const uid = isLogin ? (userInfo.id as number | undefined) : -1
  const [comment, setComment] = useState('')
  const [email, setEmail] = useState(isLogin ? userInfo.email : '')
  const [url, setUrl] = useState(isLogin ? userInfo.url : '')
  const [emailError, setEmailError] = useState({ text: '', error: false })
  const [commentError, setCommentError] = useState({ text: '', error: false })
  const [urlError, setUrlError] = useState({ text: '', error: false })
  const userAgent = window.navigator.userAgent
  const [submitSnackBar, setSubmitSnackBar] = useState({
    open: false,
    message: '发表评论成功',
    autoHideDuration: 2000,
  })
  const onSubmitSnackBarClose = () => {
    setSubmitSnackBar({
      ...submitSnackBar,
      open: false,
    })
  }

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
      const res = await Request.PostComment.Create({
        pid,
        uid,
        content: comment,
        email,
        url,
        userAgent,
      })
      if (res?.data && res?.code === 0) {
        await Retrieve(String(post.id as number))
        setSubmitSnackBar({
          ...submitSnackBar,
          open: true,
        })
      }
      scrollIntoBottom()
      setIsLoading(false)
    }
  }
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
    submitSnackBar,
    onSubmitSnackBarClose,
  }
}
