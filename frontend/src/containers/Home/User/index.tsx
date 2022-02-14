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
  Typography,
  Divider,
  Switch,
} from '@mui/material'
import { GenderCNArr } from '@/utils/Request/User'
import EmailIcon from '@mui/icons-material/Email'
import moment from 'moment'
import { useTheme } from '@mui/material/styles'
// hooks
import useUser from './useUser'
import useStyles from './useStyles'

// components
import EditDialog from './EditDialog'
import EditDialogInput from './EditDialogInput'
import { CircularLoading } from '@/components/CircularLoading'
import { SimpleConfirmDialog } from '@/components/SimpleConfirmDialog'
import { ListItemValue } from '@/components/ListItemValue'

const User: FC<RouteComponentProps & RouteConfig> = ({ history }) => {
  const classes = useStyles()
  const theme = useTheme()
  const {
    userInfo,
    userUpdatedAt,
    clonedUserInfo,
    setClonedUserInfo,
    isLogin,
    avatarLoading,
    userLoading,
    editDialog,
    mailLoading,
    mail,
    mailUpdatedAt,
    deleteDialog,
    deletingUser,
    handleEditMail,
    setDeleteDialog,
    handleDeleteDialogClose,
    handleDeleteUser,
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
                {avatarLoading && (
                  <CircularLoading
                    size={42}
                    style={{ top: 'calc(50% + 3px)' }}
                  />
                )}
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
          <ListItemValue
            className={classes.TextAreaWrapper}
            disabled
            innerClassName={classes.TextAreaInner}
            primary="创建时间"
            value={moment(userInfo?.createdAt).calendar()}
          />
          <ListItemValue
            className={classes.TextAreaWrapper}
            disabled
            innerClassName={classes.TextAreaInner}
            primary="最后修改时间"
            value={
              userUpdatedAt.isBefore(mailUpdatedAt)
                ? mailUpdatedAt.calendar()
                : userUpdatedAt.calendar()
            }
          />
          <ListSubheader>更多</ListSubheader>
          {/* 邮箱订阅 */}
          <label htmlFor="user-email-setting">
            <ListItem button>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="邮箱订阅" />
              <Switch
                checked={!!mail?.isSubscribed}
                disabled={mailLoading || mail.id === -1}
                edge="end"
                id="user-email-setting"
                onChange={handleEditMail}
              />
              {mailLoading && <CircularLoading size={20} />}
            </ListItem>
          </label>
          <Divider light />
          <ListItem
            button
            onClick={() => {
              setDeleteDialog(true)
            }}
            style={{ backgroundColor: theme.palette.error.dark }}
          >
            <ListItemText
              primary="注销账号"
              primaryTypographyProps={{
                align: 'center',
                style: {
                  color: theme.palette.background.paper,
                  fontWeight: 600,
                },
              }}
            />
          </ListItem>
        </List>

        <EditDialog
          content={editDialog.content}
          handleClose={handleEditDialogClose}
          handleSubmit={handleEditDialogSubmit}
          loading={userLoading}
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

        <SimpleConfirmDialog
          contentNode={
            <Fragment>
              <Typography
                style={{ color: theme.palette.error.main }}
                variant="subtitle1"
              >
                确定要注销账号吗？
              </Typography>
              <Typography
                style={{ color: theme.palette.error.main }}
                variant="body2"
              >
                一经注销，账号无法找回！
              </Typography>
            </Fragment>
          }
          handleClose={handleDeleteDialogClose}
          loading={deletingUser}
          onBackdropClick={handleDeleteDialogClose}
          onClose={handleDeleteDialogClose}
          onConfirm={handleDeleteUser}
          open={deleteDialog}
          title="警告"
        />
      </section>
    </div>
  )
}

export default React.memo(User)
