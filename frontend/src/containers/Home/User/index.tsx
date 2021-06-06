import React, { FC, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

// hooks
import useUser from './useUser'
import { PathName, RouteConfig } from '@/routes'
import { RouteComponentProps } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Avatar,
  CircularProgress,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    height: '100%',
  },
  user: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up(700)]: {
      width: 700,
      alignSelf: 'center',
    },
    flexGrow: 1,
  },
  userItem: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  avatarWrapper: {
    position: 'relative',
    minWidth: 40,
    marginRight: 16,
  },
  avatar: {
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
    },
  },
  avatarInput: {
    display: 'none',
  },
}))
const User: FC<RouteComponentProps & RouteConfig> = ({ history }) => {
  const classes = useStyles()
  const { userInfo, isLogin, avatarLoading, handleImgUpload } = useUser()

  useEffect(() => {
    if (!isLogin) {
      history.replace(PathName.HOME)
    }
  }, [])

  return (
    <div className={classes.root}>
      <section className={classes.user}>
        <List
          className={classes.userItem}
          component="nav"
          subheader={<ListSubheader component="div">用户信息</ListSubheader>}
        >
          <label htmlFor="avatar__upload" title="修改头像">
            <ListItem button>
              <ListItemText primary="头像" />
              <ListItemIcon className={classes.avatarWrapper}>
                <Avatar
                  alt={userInfo.userName}
                  className={classes.avatar}
                  src={userInfo.avatarUrl}
                />
                {avatarLoading && (
                  <CircularProgress
                    size={34}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      marginTop: -17,
                      marginLeft: -17,
                    }}
                  />
                )}
                <input
                  accept="image/png, image/jpeg, image/jpg"
                  className={classes.avatarInput}
                  id="avatar__upload"
                  onChange={handleImgUpload}
                  type="file"
                />
              </ListItemIcon>
            </ListItem>
          </label>
        </List>
      </section>
    </div>
  )
}

export default User
