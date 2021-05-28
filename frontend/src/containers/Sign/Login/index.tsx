import React, { FC } from 'react'
import classNames from 'classnames'
import { Link, RouteComponentProps } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  CircularProgress,
  InputAdornment,
  Paper,
  Typography,
} from '@material-ui/core'
import { PathName, RouteConfig } from '@/routes'
import { Input, PasswordInput } from '@/components/Input'
import { formValid } from '@/components/UserFormValid'
import { AccountCircle } from '@material-ui/icons'

// hooks
import useLogin from './useLogin'

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
    marginBottom: '1.5rem',
  },
}))

const Login: FC<RouteComponentProps & RouteConfig> = () => {
  const classes = useStyles()
  const {
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
  } = useLogin()

  return (
    <Paper className={classes.form} elevation={1}>
      <form className="flex flex-column">
        <Typography
          className={classNames('non-select', classes.formTitle)}
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') void handlerLogin()
          }}
          password={password}
          required
        />
        {/* ACTION */}
        <div
          className="flex flex-column flex-center"
          style={{ marginTop: '0.5rem' }}
        >
          <div className="flex" style={{ marginBottom: '1rem' }}>
            <Link replace style={{ marginRight: '0.5rem' }} to={PathName.HOME}>
              <Button variant="text">返回首页</Button>
            </Link>
            <Link replace to={PathName.REGISTER}>
              <Button variant="text">还没有账号？前往注册</Button>
            </Link>
          </div>
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
  )
}
export default Login
