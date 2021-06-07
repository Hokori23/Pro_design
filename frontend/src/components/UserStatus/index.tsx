import React, { FC, Fragment, useState } from 'react'
import { RootState, store } from '@/store'
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
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
import { PathName, RouteName } from '@/routes'
import { useHistory, useLocation } from 'react-router-dom'

import InnerLink from '@/components/InnerLink'
import { Group } from '@/utils/Request/User'

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0.5rem',
    },
  },
  avatar: {
    '& .MuiAvatar-root': {
      width: 40,
      height: 40,
      border: '2px solid #ffffff',
    },
    padding: 0,
    margin: 0,
  },
}))

const menuId = 'home-account-menu'
const UserStatus: FC = () => {
  const state = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.common)
  const { isLogin, userInfo } = state
  const location = useLocation()
  const history = useHistory()
  const isAdminPage = location.pathname.startsWith(PathName.ADMIN)
  const isAdmin = userInfo.group && userInfo.group > Group.SUBSCRIBER
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
            history.push(PathName.HOME)
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
      {isAdminPage && isAdmin ? (
        <InnerLink className="plain-a" to={PathName.HOME}>
          <MenuItem dense={isMobileSize} onClick={handleMenuClose}>
            {RouteName.HOME}
          </MenuItem>
        </InnerLink>
      ) : (
        <InnerLink className="plain-a" to={PathName.ADMIN}>
          <MenuItem dense={isMobileSize} onClick={handleMenuClose}>
            {RouteName.ADMIN}
          </MenuItem>
        </InnerLink>
      )}
      <InnerLink className="plain-a" to={PathName.USER}>
        <MenuItem dense={isMobileSize} onClick={handleMenuClose}>
          用户中心
        </MenuItem>
      </InnerLink>
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
        <InnerLink className="plain-a" to={PathName.LOGIN}>
          <Button
            className={classes.button}
            color="inherit"
            size={isMobileSize ? 'small' : 'medium'}
            variant="outlined"
          >
            登录
          </Button>
        </InnerLink>
        <InnerLink className="plain-a" to={PathName.REGISTER}>
          <Button
            color="inherit"
            size={isMobileSize ? 'small' : 'medium'}
            variant="text"
          >
            注册
          </Button>
        </InnerLink>
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
