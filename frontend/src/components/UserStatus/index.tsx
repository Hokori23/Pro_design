import React, { FC, Fragment, useState } from 'react'
import { RootState, store } from '@/store'
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Avatar,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useSelector } from 'react-redux'
import { PathName, RouteName } from '@/routes'
import { useHistory, useLocation } from 'react-router-dom'
import { Group } from '@/utils/Request/User'

// components
import { SimpleConfirmDialog } from '@/components/SimpleConfirmDialog'
import InnerLink from '@/components/InnerLink'

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
  const isAdmin = (userInfo?.group || 0) > Group.SUBSCRIBER
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

  const RenderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      onClose={handleMenuClose}
      open={isMenuOpen}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {isAdmin ? (
        isAdminPage ? (
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
        )
      ) : null}
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
      {RenderMenu}
      <SimpleConfirmDialog
        content="确定要退出登录？"
        handleClose={handleDialogClose}
        isMobileSize={isMobileSize}
        onBackdropClick={handleDialogClose}
        onClose={handleDialogClose}
        onConfirm={() => {
          dispatch.LOGOUT()
          handleDialogClose()
          history.push(PathName.HOME)
        }}
        open={logOutDialog}
        title="提示"
      />
    </Fragment>
  )
}
export default UserStatus
