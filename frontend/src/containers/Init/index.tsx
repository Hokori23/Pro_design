import React, { FC, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useAsync } from 'react-use'
import { useSnackbar } from 'notistack'
import classNames from 'classnames'
import {
  Button,
  CircularProgress,
  Grow,
  InputAdornment,
  Paper,
  Portal,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AccountCircle, Person } from '@material-ui/icons'
import {
  Input,
  PasswordInput,
  EmailInput,
  GenderSelect,
} from '@/components/Input'
import { SimpleAlertDialog } from '@/components/SimpleAlertDialog'
import { Request } from '@/utils'
import { Gender } from '@/utils/Request/user'
import { isDef } from '@/utils/tools'
import { PathName, RouteConfig } from '@/routes'
import { formValid, checkPassword } from './formValid'
import './index.less'

const useStyles = makeStyles((theme) => ({
  title: {
    padding: '1rem 2.5rem',
  },
  subTitle: {
    padding: '0.5rem 2.5rem',
  },
  initErrorMessagePaper: {
    backgroundColor: theme.palette.error.dark,
    marginBottom: '1rem',
  },
  initErrorMessage: {
    padding: '1rem 2rem',
    color: theme.palette.background.default,
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
  form: {
    padding: '0.5rem 3rem 2rem 3rem',
    backgroundColor: theme.palette.grey[50],
  },
  formItem: {
    marginBottom: '1rem',
  },
  genderRadio: {
    display: 'flex',
    flexDirection: 'row',
  },
}))

const Init: FC<RouteComponentProps & RouteConfig> = ({ routes, history }) => {
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()

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

  const [isIniting, setIsIniting] = useState(true)
  const [isInitingUser, setIsInitingUser] = useState(false)
  const [initErrorMessage, setInitErrorMessage] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)

  const forwardLogin = () => history.replace(`${PathName.LOGIN}`)

  // 初始化超级管理员
  const handlerInitUser = async (): Promise<void> => {
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
      })
    ) {
      return
    }

    setIsInitingUser(true)
    const user = await Request.user.Init({
      userAccount,
      userName,
      password,
      gender,
      email,
    })
    if (isDef(user)) {
      setIsRegistered(true)
    }
    setIsInitingUser(false)
  }

  // 初始化数据库
  useAsync(async () => {
    setIsIniting(true)
    const data = await Request.init.Init()
    if (data?.code) {
      setInitErrorMessage(data?.message)
    } else {
      enqueueSnackbar(data?.message, {
        variant: 'success',
      })
    }
    setIsIniting(false)
  }, [])

  return (
    <div className="Init flex flex-column">
      <Paper className={classNames('non-select', classes.title)} elevation={0}>
        <Typography color="primary" noWrap variant="h3">
          Geek Blog
        </Typography>
      </Paper>

      <Paper
        className={classNames('non-select', classes.subTitle)}
        elevation={0}
      >
        <Typography className="flex flex-center" color="primary" variant="h5">
          初始化数据库
          {isIniting && (
            <CircularProgress size={18} style={{ marginLeft: '10px' }} />
          )}
        </Typography>
      </Paper>

      {/* 初始化失败 */}
      {initErrorMessage && (
        <Grow
          in={Boolean(initErrorMessage)}
          {...(initErrorMessage ? { timeout: 500 } : {})}
        >
          <Paper
            className={classNames('non-select', classes.initErrorMessagePaper)}
            elevation={0}
          >
            <Typography
              className={classes.initErrorMessage}
              variant="subtitle1"
            >
              {initErrorMessage}
            </Typography>
          </Paper>
        </Grow>
      )}

      {/* 表单 */}
      <Paper className={classes.form} elevation={1}>
        <form className="flex flex-column">
          <Typography
            className={classes.formTitle}
            color="primary"
            variant="h6"
          >
            注册超级管理员
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
            disabled={isIniting || Boolean(initErrorMessage) || isInitingUser}
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
            disabled={isIniting || Boolean(initErrorMessage) || isInitingUser}
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
            disabled={isIniting || Boolean(initErrorMessage) || isInitingUser}
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
            password={password}
            required
          />
          <PasswordInput
            className={classes.formItem}
            color="primary"
            disabled={isIniting || Boolean(initErrorMessage) || isInitingUser}
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
            disabled={isIniting || Boolean(initErrorMessage) || isInitingUser}
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
          <GenderSelect
            className={classNames(classes.formItem, classes.genderRadio)}
            disabled={isIniting || Boolean(initErrorMessage) || isInitingUser}
            label="性别"
            onChange={(e) => setGender(Number(e.target.value))}
            value={gender}
          />
        </form>

        {/* ACTION */}
        <div className="flex flex-center" style={{ marginTop: '0.5rem' }}>
          <div style={{ position: 'relative' }}>
            <Button
              color="primary"
              disabled={isIniting || Boolean(initErrorMessage) || isInitingUser}
              onClick={() => void handlerInitUser()}
              style={{ position: 'relative' }}
              variant="contained"
            >
              注册
            </Button>
            {isInitingUser && (
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
          <Portal>
            <SimpleAlertDialog
              contentNode={
                <Typography variant="subtitle1">
                  注册成功，跳转到登陆页面
                </Typography>
              }
              handleClose={() => forwardLogin()}
              onClose={() => forwardLogin()}
              open={isRegistered}
              title="提示"
            ></SimpleAlertDialog>
          </Portal>
        </div>
      </Paper>
    </div>
  )
}

export default withRouter(Init)
