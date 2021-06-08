import React, { FC, Fragment, useEffect } from 'react'
import { PathName, RouteConfig } from '@/routes'
import { RouteComponentProps } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Avatar,
  CircularProgress as _CircularProgress,
  Typography,
  Divider,
} from '@material-ui/core'
import { GenderCNArr } from '@/utils/Request/User'

// hooks
import useUser from './useUser'
import useStyles from './useStyles'

// components
import EditDialog from './EditDialog'
import EditDialogInput from './EditDialogInput'

const CircularProgress: FC = () => (
  <_CircularProgress
    size={42}
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginTop: -21,
      marginLeft: -21,
    }}
  />
)
interface ListItemValueProps {
  primary: string
  className?: string
  innerClassName?: string
  value?: string
  onClick?: () => void
  disabled?: boolean
}
const ListItemValue: FC<ListItemValueProps> = ({
  primary,
  className,
  innerClassName,
  value,
  onClick,
  disabled,
}) => (
  <Fragment>
    <ListItem button disabled={disabled} onClick={onClick}>
      <ListItemText primary={primary} />
      <ListItemText className={className} disableTypography>
        <Typography className={innerClassName} color="textSecondary">
          {value}
        </Typography>
      </ListItemText>
    </ListItem>
    <Divider light />
  </Fragment>
)

const User: FC<RouteComponentProps & RouteConfig> = ({ history }) => {
  const classes = useStyles()
  const {
    userInfo,
    clonedUserInfo,
    setClonedUserInfo,
    isLogin,
    avatarLoading,
    userLoading,
    editDialog,
    handleEditDialogClose,
    handleEditDialogOpen,
    handleEditDialogValid,
    handleEditDialogSubmit,
    handleImgUpload,
  } = useUser()

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
          <Divider light />
          <label htmlFor="avatar__upload" title="修改头像">
            <ListItem button>
              <ListItemText primary="头像" />
              <ListItemIcon className={classes.AvatarWrapper}>
                <Avatar alt={userInfo.userName} src={userInfo.avatarUrl} />
                {avatarLoading && <CircularProgress />}
              </ListItemIcon>
            </ListItem>
          </label>
          <input
            accept="image/png, image/jpeg, image/jpg"
            className={classes.avatarInput}
            id="avatar__upload"
            onChange={handleImgUpload}
            type="file"
          />
          <Divider light />
          <ListItemValue
            className={classes.ValueWrapper}
            disabled
            innerClassName={classes.ValueInner}
            primary="账号"
            value={userInfo.userAccount}
          />
          <ListItemValue
            className={classes.ValueWrapper}
            innerClassName={classes.ValueInner}
            onClick={() =>
              handleEditDialogOpen({
                title: '修改用户名*',
                content:
                  '用户名长度应为2至20字符且只能由字母、数字、下划线组成',
                input: clonedUserInfo.userName,
                attr: 'userName',
              })
            }
            primary="用户名"
            value={userInfo.userName}
          />
          <ListItemValue
            className={classes.ValueWrapper}
            onClick={() =>
              handleEditDialogOpen({
                title: '修改性别*',
                input: clonedUserInfo.gender,
                attr: 'gender',
              })
            }
            primary="性别"
            value={GenderCNArr[userInfo.gender as number]}
          />
          <ListItemValue
            className={classes.ValueWrapper}
            innerClassName={classes.ValueInner}
            onClick={() =>
              handleEditDialogOpen({
                title: '修改邮箱*',
                content: '请输入合法邮箱',
                input: clonedUserInfo.email,
                attr: 'email',
              })
            }
            primary="邮箱"
            value={userInfo.email}
          />
          <ListItemValue
            className={classes.ValueWrapper}
            innerClassName={classes.ValueInner}
            onClick={() =>
              handleEditDialogOpen({
                title: '修改个人网站',
                content: '请输入合法链接',
                input: clonedUserInfo.url,
                attr: 'url',
              })
            }
            primary="个人网站"
            value={userInfo.url}
          />
          <ListItemValue
            className={classes.TextAreaWrapper}
            innerClassName={classes.TextAreaInner}
            onClick={() =>
              handleEditDialogOpen({
                title: '修改个人简介',
                content: '介绍下自己吧！',
                input: clonedUserInfo.profile,
                attr: 'profile',
              })
            }
            primary="个人简介"
            value={userInfo.profile}
          />
        </List>
        <EditDialog
          content={editDialog.content}
          handleClose={handleEditDialogClose}
          handleSubmit={handleEditDialogSubmit}
          open={editDialog.open}
          title={editDialog.title}
          valid={editDialog.valid}
        >
          <EditDialogInput
            attr={editDialog.attr}
            handleValid={handleEditDialogValid}
            loading={userLoading}
            setUserInfo={setClonedUserInfo}
            userInfo={clonedUserInfo}
          />
        </EditDialog>
      </section>
    </div>
  )
}

export default User
