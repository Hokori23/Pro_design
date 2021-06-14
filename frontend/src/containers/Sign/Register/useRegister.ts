import { formValid } from '@/components/UserFormValid'
import { Gender } from '@/utils/Request/User'
import { isDef } from '@/utils/tools'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Request } from '@/utils'

export default () => {
  const { enqueueSnackbar } = useSnackbar()
  // 注册表单
  const [userAccount, setUserAccount] = useState('')
  const [userAccountError, setUserAccountError] = useState({
    text: '',
    error: false,
  })
  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState({ text: '', error: false })
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState({ text: '', error: false })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    text: '',
    error: false,
  })
  const [gender, setGender] = useState(Gender.UNKNOWN)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState({ text: '', error: false })
  const [emailCaptcha, setEmailCaptcha] = useState('')
  const [emailCaptchaError, setEmailCaptchaError] = useState({
    text: '',
    error: false,
  })

  // status
  const [isRegistering, setIsRegistering] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  // 发送邮箱验证码逻辑
  const handleSendCaptcha = async (): Promise<boolean> => {
    if (
      !formValid({
        userAccount: {
          value: userAccount,
          errorSetter: setUserAccountError,
        },
        userName: {
          value: userName,
          errorSetter: setUserNameError,
        },
        email: {
          value: email,
          errorSetter: setEmailError,
        },
      })
    ) {
      return false
    }
    const res = await Request.User.SendCaptcha(userAccount, userName, email)
    if (isDef(res) && res.code === 0) {
      enqueueSnackbar(res.message, {
        variant: 'success',
      })
      return true
    }
    return false
  }
  // 注册逻辑
  const handleRegisterUser = async (): Promise<void> => {
    // 验证表单
    if (
      !formValid({
        userAccount: {
          value: userAccount,
          errorSetter: setUserAccountError,
        },
        userName: {
          value: userName,
          errorSetter: setUserNameError,
        },
        password: {
          value: password,
          errorSetter: setPasswordError,
        },
        email: {
          value: email,
          errorSetter: setEmailError,
        },
        emailCaptcha: {
          value: emailCaptcha,
          errorSetter: setEmailCaptchaError,
        },
      })
    ) {
      return
    }

    setIsRegistering(true)
    const res = await Request.User.Register({
      userAccount,
      userName,
      password,
      gender,
      email,
      captcha: emailCaptcha,
    })
    if (res?.data) {
      enqueueSnackbar(`${res.message}，请在登录页登录`, {
        variant: 'info',
      })
      setIsRegistered(true)
    }
    setIsRegistering(false)
  }
  return {
    userAccount,
    setUserAccount,
    userAccountError,
    setUserAccountError,
    userName,
    setUserName,
    userNameError,
    setUserNameError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    setConfirmPasswordError,
    email,
    setEmail,
    emailError,
    setEmailError,
    emailCaptcha,
    setEmailCaptcha,
    emailCaptchaError,
    setEmailCaptchaError,
    gender,
    setGender,
    isRegistering,
    isRegistered,
    handleRegisterUser,
    handleSendCaptcha,
  }
}
