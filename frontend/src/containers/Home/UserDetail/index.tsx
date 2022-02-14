import React, { FC } from 'react'
import { RouteConfig } from '@/routes'
import { RouteComponentProps } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Avatar,
  Typography,
  Divider,
} from '@mui/material'
import { GenderCNArr } from '@/utils/Request/User'

// hooks
import useUser from './useUser'
import useStyles from './useStyles'
import { CircularLoading } from '@/components/CircularLoading'

// components
import { ListItemValue } from '@/components/ListItemValue'

const User: FC<RouteComponentProps & RouteConfig> = ({ history }) => {
  const classes = useStyles()
  const { loading, user } = useUser(history)
  return (
    <div className={classes.root}>
      <section className={classes.user}>
        {loading ? (
          <CircularLoading />
        ) : user ? (
          <List
            className={classes.userItem}
            component="nav"
            subheader={<ListSubheader component="div">用户信息</ListSubheader>}
          >
            <Divider light />
            <ListItem button>
              <ListItemText primary="头像" />
              <ListItemIcon className={classes.AvatarWrapper}>
                <Avatar alt={user.userName} src={user.avatarUrl} />
              </ListItemIcon>
            </ListItem>
            <Divider light />
            <ListItemValue
              className={classes.ValueWrapper}
              disabled
              innerClassName={classes.ValueInner}
              primary="账号"
              value={user.userAccount}
            />
            <ListItemValue
              className={classes.ValueWrapper}
              innerClassName={classes.ValueInner}
              primary="用户名"
              value={user.userName}
            />
            <ListItemValue
              className={classes.ValueWrapper}
              primary="性别"
              value={GenderCNArr[user.gender as number]}
            />
            <ListItemValue
              className={classes.ValueWrapper}
              innerClassName={classes.ValueInner}
              primary="邮箱"
              value={user.email}
            />
            <ListItemValue
              className={classes.ValueWrapper}
              innerClassName={classes.ValueInner}
              primary="个人网站"
              value={user.url}
            />
            <ListItemValue
              className={classes.TextAreaWrapper}
              innerClassName={classes.TextAreaInner}
              primary="个人简介"
              value={user.profile}
            />
          </List>
        ) : (
          <Typography />
        )}
      </section>
    </div>
  )
}

export default React.memo(User)
