import { formValid } from '@/components/UserFormValid'
import { store } from '@/store'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Request } from '@/utils'

export default () => {
  const dispatch = useSelector(() => store.dispatch.common)
  // 登录表单
  const [userAccount, setUserAccount] = useState('')
  const [userAccountError, setUserAccountError] = useState({
    text: '',
    error: false,
  })
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState({ text: '', error: false })

  const [isLogining, setIsLogining] = useState(false)

  // 登录
  const handlerLogin = async (): Promise<void> => {
    // 验证表单
    if (
      !formValid({
        userAccount: {
          value: userAccount,
          errorSetter: setUserAccountError,
        },
        password: {
          value: password,
          errorSetter: setPasswordError,
        },
      })
    ) {
      return
    }

    setIsLogining(true)
    const res = await Request.User.Login({
      userAccount,
      password,
    })
    setIsLogining(false)
    if (res?.data) {
      dispatch.SET_USER_INFO(res.data)
      dispatch.SET_TOKEN(res.data.token)
      dispatch.LOGIN()
    }
  }

  return {
    isLogining,
    userAccount,
    setUserAccount,
    userAccountError,
    setUserAccountError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    handlerLogin,
  }
}
