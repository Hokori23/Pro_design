import React, { FC, useState } from 'react'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'
import { useAliveController } from 'react-activation'
import { PathName, RouteConfig } from '@/routes'
import { Gender } from '@/utils/Request/User'
import { isDef } from '@/utils/tools'
import {
  Button,
  CircularProgress,
  InputAdornment,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { Request } from '@/utils'
import { checkPassword, formValid } from '@/components/UserFormValid'
import classNames from 'classnames'
import {
  EmailInput,
  EmailCaptcha,
  GenderSelect,
  Input,
  PasswordInput,
} from '@/components/Input'
import { AccountCircle, Person } from '@material-ui/icons'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  form: {
    padding: '0.5rem 3rem 2rem 3rem',
    backgroundColor: theme.palette.grey[50],
  },
  formTitle: {
    textAlign: 'center',
    margin: '2rem 0',
  },
  formItem: {
    marginBottom: '1rem',
  },
  genderRadio: {
    display: 'flex',
    flexDirection: 'row',
  },
  action: {
    justifyContent: 'space-around',
  },
}))

const Register: FC<RouteComponentProps & RouteConfig> = ({ location }) => {
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const { dropScope } = useAliveController()
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
  if (isRegistered) {
    // 清除缓存
    void dropScope(location.pathname)
    return <Redirect to={PathName.LOGIN} />
  }

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
    if (res?.data && res?.code === 0) {
      enqueueSnackbar(`${res.message}，请在登录页登录`, {
        variant: 'info',
      })
      setIsRegistered(true)
    }
    setIsRegistering(false)
  }

  return (
    <Paper className={classes.form} elevation={1}>
      <form className="flex flex-column">
        <Typography
          className={classNames('non-select', classes.formTitle)}
          color="primary"
          variant="h4"
        >
          注册
        </Typography>
        <Input
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle color="action" />
              </InputAdornment>
            ),
          }}
          className={classes.formItem}
          color="primary"
          disabled={isRegistering}
          error={userAccountError.error}
          helperText={userAccountError.text}
          label="账号"
          onBlur={() =>
            formValid({
              userAccount: {
                value: userAccount,
                errorSetter: setUserAccountError,
              },
            })
          }
          onChange={(e) => setUserAccount(e.target.value)}
          required
        />
        <Input
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="action" />
              </InputAdornment>
            ),
          }}
          className={classes.formItem}
          color="primary"
          disabled={isRegistering}
          error={userNameError.error}
          helperText={userNameError.text}
          label="用户名"
          onBlur={() =>
            formValid({
              userName: {
                value: userName,
                errorSetter: setUserNameError,
              },
            })
          }
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <PasswordInput
          className={classes.formItem}
          color="primary"
          disabled={isRegistering}
          error={passwordError.error}
          helperText={passwordError.text}
          label="密码"
          onBlur={() =>
            formValid({
              password: {
                value: password,
                errorSetter: setPasswordError,
              },
            })
          }
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void handleRegisterUser()
          }}
          password={password}
          required
        />
        <PasswordInput
          className={classes.formItem}
          color="primary"
          disabled={isRegistering}
          error={confirmPasswordError.error}
          helperText={confirmPasswordError.text}
          label="确认密码"
          onBlur={() =>
            checkPassword(password, confirmPassword, setConfirmPasswordError)
          }
          onChange={(e) => setConfirmPassword(e.target.value)}
          password={confirmPassword}
          required
        />
        <EmailInput
          className={classes.formItem}
          color="primary"
          email={email}
          error={emailError.error}
          helperText={emailError.text}
          label="邮箱"
          onBlur={() =>
            formValid({
              email: {
                value: email,
                errorSetter: setEmailError,
              },
            })
          }
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <EmailCaptcha
          className={classes.formItem}
          color="primary"
          emailCaptcha={emailCaptcha}
          error={emailCaptchaError.error}
          helperText={emailCaptchaError.text}
          label="验证码"
          onBlur={() =>
            formValid({
              emailCaptcha: {
                value: emailCaptcha,
                errorSetter: setEmailCaptchaError,
              },
            })
          }
          onChange={(e) => setEmailCaptcha(e.target.value)}
          required
          sendCaptcha={handleSendCaptcha}
        />
        <GenderSelect
          className={classNames(classes.formItem, classes.genderRadio)}
          disabled={isRegistering}
          label="性别"
          onChange={(e) => setGender(Number(e.target.value))}
          value={gender}
        />
        {/* ACTION */}
        <div
          className={classNames('flex', classes.action)}
          style={{ marginTop: '0.5rem' }}
        >
          <Link replace style={{ marginBottom: '0.5rem' }} to={PathName.LOGIN}>
            <Button variant="text">返回登陆</Button>
          </Link>
          <div style={{ position: 'relative' }}>
            <Button
              color="primary"
              disabled={isRegistering}
              onClick={() => void handleRegisterUser()}
              style={{ position: 'relative' }}
              variant="contained"
            >
              注册
            </Button>
            {isRegistering && (
              <CircularProgress
                size={20}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  marginTop: -10,
                  marginLeft: -10,
                }}
              />
            )}
          </div>
        </div>
      </form>
    </Paper>
  )
}
export default Register
