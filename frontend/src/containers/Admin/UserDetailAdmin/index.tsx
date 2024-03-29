import React, { FC, Fragment } from 'react'
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
  Switch,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GenderCNArr } from '@/utils/Request/User'
import EmailIcon from '@mui/icons-material/Email'
import { isBefore } from 'date-fns'
import { formatDistanceToNow } from '@/utils/tools'

// hooks
import useUserDetailAdmin from './useUserDetailAdmin'
import useStyles from './useStyles'

// components
import EditDialog from './EditDialog'
import EditDialogInput from './EditDialogInput'
import { CircularLoading } from '@/components/CircularLoading'
import { SimpleConfirmDialog } from '@/components/SimpleConfirmDialog'
import { ListItemValue } from '@/components/ListItemValue'

const UserDetailAdmin: FC<RouteComponentProps & RouteConfig> = ({
  history,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const {
    user,
    userUpdatedAt,
    clonedUserInfo,
    setClonedUserInfo,
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
  } = useUserDetailAdmin()

  return (
    <div className={classes.root}>
      <section className={classes.user}>
        <List
          className={classes.userItem}
          component="nav"
          subheader={<ListSubheader component="div">用户信息</ListSubheader>}
        >
          <Divider light />
          <ListItem button>
            <ListItemText primary="头像" />
            <ListItemIcon className={classes.AvatarWrapper}>
              <Avatar alt={user?.userName} src={user?.avatarUrl} />
            </ListItemIcon>
          </ListItem>
          <Divider light />
          <ListItemValue
            className={classes.ValueWrapper}
            disabled
            innerClassName={classes.ValueInner}
            primary="账号"
            value={user?.userAccount}
          />
          <ListItemValue
            className={classes.ValueWrapper}
            innerClassName={classes.ValueInner}
            onClick={() =>
              handleEditDialogOpen({
                title: '修改用户名*',
                content:
                  '用户名长度应为2至20字符且只能由字母、数字、下划线组成',
                attr: 'userName',
              })
            }
            primary="用户名"
            value={user?.userName}
          />
          <ListItemValue
            className={classes.ValueWrapper}
            onClick={() =>
              handleEditDialogOpen({
                title: '修改性别*',
                attr: 'gender',
              })
            }
            primary="性别"
            value={GenderCNArr[user?.gender as number]}
          />
          <ListItemValue
            className={classes.ValueWrapper}
            innerClassName={classes.ValueInner}
            onClick={() =>
              handleEditDialogOpen({
                title: '修改邮箱*',
                content: '请输入合法邮箱',
                attr: 'email',
              })
            }
            primary="邮箱"
            value={user?.email}
          />
          <ListItemValue
            className={classes.ValueWrapper}
            innerClassName={classes.ValueInner}
            onClick={() =>
              handleEditDialogOpen({
                title: '修改个人网站',
                content: '请输入合法链接',
                attr: 'url',
              })
            }
            primary="个人网站"
            value={user?.url}
          />
          <ListItemValue
            className={classes.TextAreaWrapper}
            innerClassName={classes.TextAreaInner}
            onClick={() =>
              handleEditDialogOpen({
                title: '修改个人简介',
                content: '介绍下自己吧！',
                attr: 'profile',
              })
            }
            primary="个人简介"
            value={user?.profile}
          />
          <ListItemValue
            className={classes.TextAreaWrapper}
            disabled
            innerClassName={classes.TextAreaInner}
            primary="创建时间"
            value={formatDistanceToNow(new Date(user?.createdAt as string))}
          />
          <ListItemValue
            className={classes.TextAreaWrapper}
            disabled
            innerClassName={classes.TextAreaInner}
            primary="最后修改时间"
            value={
              isBefore(userUpdatedAt, mailUpdatedAt)
                ? formatDistanceToNow(mailUpdatedAt)
                : formatDistanceToNow(userUpdatedAt)
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
                disabled={mailLoading || mail?.id === -1}
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
              primary="删除账号"
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
                确定要删除账号吗？
              </Typography>
              <Typography
                style={{ color: theme.palette.error.main }}
                variant="body2"
              >
                一经删除，账号无法找回！
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

export default UserDetailAdmin
