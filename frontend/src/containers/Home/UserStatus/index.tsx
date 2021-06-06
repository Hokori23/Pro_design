import React, { FC, Fragment, useState } from 'react'
import { RootState, store } from '@/store'
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Link,
  makeStyles,
  useMediaQuery,
  useTheme,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useSelector } from 'react-redux'
import { PathName } from '@/routes'

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0.5rem',
    },
  },
  avatar: {
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
    },
    padding: 5,
    margin: 2,
  },
}))

const menuId = 'home-account-menu'
const UserStatus: FC = () => {
  const state = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.common)
  const { isLogin, userInfo } = state
  const classes = useStyles()
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))

  const [anchorEl, setAnchorEl] = useState(
    null as (EventTarget & HTMLButtonElement) | null,
  )
  const [logOutDialog, setLogDialog] = useState(false)

  const isMenuOpen = Boolean(anchorEl)
  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const handleDialogClose = () => {
    setLogDialog(false)
  }

  const LogOutDialog = (
    <Dialog
      onBackdropClick={handleDialogClose}
      onClose={handleDialogClose}
      open={logOutDialog}
    >
      <DialogTitle>提示</DialogTitle>
      <DialogContent>
        <DialogContentText>确定要退出登录？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={handleDialogClose}
          size={isMobileSize ? 'small' : 'medium'}
        >
          取消
        </Button>
        <Button
          autoFocus
          color="primary"
          onClick={() => {
            dispatch.LOGOUT()
            handleDialogClose()
          }}
          size={isMobileSize ? 'small' : 'medium'}
          variant="outlined"
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  )
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      onClose={handleMenuClose}
      open={isMenuOpen}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem dense={isMobileSize} onClick={handleMenuClose}>
        用户中心
      </MenuItem>
      <MenuItem
        dense={isMobileSize}
        onClick={() => {
          setLogDialog(true)
          handleMenuClose()
        }}
      >
        退出登录
      </MenuItem>
    </Menu>
  )

  if (!isLogin) {
    return (
      <Fragment>
        <Button
          className={classes.button}
          color="inherit"
          size={isMobileSize ? 'small' : 'medium'}
          variant="outlined"
        >
          <Link className="plain-a" href={PathName.LOGIN}>
            登录
          </Link>
        </Button>
        <Button
          color="inherit"
          size={isMobileSize ? 'small' : 'medium'}
          variant="text"
        >
          <Link className="plain-a" href={PathName.REGISTER}>
            注册
          </Link>
        </Button>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <IconButton
        className={classes.avatar}
        color="inherit"
        onClick={handleProfileMenuOpen}
      >
        {userInfo.avatarUrl ? (
          <Avatar alt={userInfo.userName} src={userInfo.avatarUrl} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      {renderMenu}
      {LogOutDialog}
    </Fragment>
  )
}
export default UserStatus
