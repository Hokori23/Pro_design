import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  CircularProgress,
  InputAdornment,
  Paper,
  Typography,
} from '@material-ui/core'
import { RouteComponentProps } from 'react-router-dom'
import { PathName, RouteConfig } from '@/routes'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'
import './index.less'
import { Input, PasswordInput } from '@/components/Input'
import { Request } from '@/utils'
import { formValid } from '@/containers/Init/formValid'
import { AccountCircle } from '@material-ui/icons'
import { isDef } from '@/utils/tools'

const useStyles = makeStyles((theme) => ({
  title: {
    padding: '1rem 2.5rem',
  },
  form: {
    padding: '0.5rem 3rem 2rem 3rem',
    backgroundColor: theme.palette.grey[50],
  },
  formTitle: {
    textAlign: 'center',
    margin: '2rem 0',
  },
  formItem: {
    marginBottom: '1.5rem',
  },
}))
const Login: FC<RouteComponentProps & RouteConfig> = ({ history }) => {
  const classes = useStyles()
  const dispatch = useSelector(() => store.dispatch.common)
  const state = useSelector((state: RootState) => state.common)

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
    const user = await Request.user.Login({
      userAccount,
      password,
    })
    if (isDef(user)) {
      dispatch.SET_USER_INFO(user)
      dispatch.SET_TOKEN(user.token)
      dispatch.LOGIN()
      history.replace(PathName.HOME)
    }
  }

  if (state.isLogin) return null

  return (
    <div className="Login flex flex-column">
      <Paper className={classNames('non-select', classes.title)} elevation={0}>
        <Typography color="primary" noWrap variant="h3">
          Geek Blog
        </Typography>
      </Paper>
      <Paper className={classes.form} elevation={1}>
        <form className="flex flex-column">
          <Typography
            className={classes.formTitle}
            color="primary"
            variant="h4"
          >
            登录
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
            disabled={isLogining}
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
          <PasswordInput
            className={classes.formItem}
            color="primary"
            disabled={isLogining}
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
          {/* ACTION */}
          <div className="flex flex-center" style={{ marginTop: '0.5rem' }}>
            <div style={{ position: 'relative' }}>
              <Button
                color="primary"
                disabled={isLogining}
                onClick={() => void handlerLogin()}
                style={{ position: 'relative' }}
                variant="contained"
              >
                登录
              </Button>
              {isLogining && (
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
    </div>
  )
}
export default Login
