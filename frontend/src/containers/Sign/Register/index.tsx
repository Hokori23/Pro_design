import React, { FC } from 'react'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'
import { useAliveController } from 'react-activation'
import { PathName, RouteConfig } from '@/routes'
import {
  Button,
  CircularProgress,
  InputAdornment,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { checkPassword, formValid } from '@/components/UserFormValid'
import classnames from 'classnames'
import {
  EmailInput,
  EmailCaptcha,
  GenderSelect,
  Input,
  PasswordInput,
} from '@/components/Input'
import { AccountCircle, Person } from '@material-ui/icons'

// hooks
import useRegister from './useRegister'

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
  const classes = useStyles()
  const { dropScope } = useAliveController()
  const {
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
  } = useRegister()
  if (isRegistered) {
    // 清除缓存
    void dropScope(location.pathname)
    return <Redirect to={PathName.LOGIN} />
  }

  return (
    <Paper className={classes.form} elevation={1}>
      <form className="flex flex-column">
        <Typography
          className={classnames('non-select', classes.formTitle)}
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
          className={classnames(classes.formItem, classes.genderRadio)}
          disabled={isRegistering}
          label="性别"
          onChange={(e) => setGender(Number(e.target.value))}
          value={gender}
        />
        {/* ACTION */}
        <div
          className={classnames('flex', classes.action)}
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
