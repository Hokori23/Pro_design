import React, { FC, Fragment } from 'react'
import {
  Button,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import SendIcon from '@material-ui/icons/Send'
import { PathName } from '@/routes'

// hooks
import usePostAction from './usePostAction'

// components
import { SimpleConfirmDialog } from '@/components/SimpleConfirmDialog'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: 'rgb(154, 0, 54)',
    },
  },
  deleteButtonIcon: {
    color: theme.palette.background.paper,
  },
}))

const PostAction: FC = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    state,
    dispatch,
    history,
    deleteDialog,
    setDeleteDialog,
    handleDialogClose,
  } = usePostAction()

  return (
    <Fragment>
      {!state.isNew && (
        <Button
          className={(classes.button, classes.deleteButton)}
          onClick={() => {
            setDeleteDialog(true)
          }}
          size={isMobileSize ? 'small' : 'medium'}
          startIcon={<DeleteIcon className={classes.deleteButtonIcon} />}
          variant="contained"
        >
          删除
        </Button>
      )}
      {state.isNew ? (
        <Button
          className={classes.button}
          color="primary"
          onClick={dispatch.CreatePost}
          size={isMobileSize ? 'small' : 'medium'}
          startIcon={<SendIcon />}
          variant="contained"
        >
          发布
        </Button>
      ) : (
        <Button
          className={classes.button}
          color="primary"
          onClick={dispatch.EditPost}
          size={isMobileSize ? 'small' : 'medium'}
          startIcon={<SaveIcon />}
          variant="contained"
        >
          保存
        </Button>
      )}
      {!state.isNew && (
        <SimpleConfirmDialog
          contentNode={
            <Fragment>
              <Typography color="textSecondary" component="p" variant="body1">
                确定要删除该文章吗？
              </Typography>
              <Typography color="error" component="p" variant="caption">
                会连同删除该文章下的所有评论！
              </Typography>
            </Fragment>
          }
          handleClose={handleDialogClose}
          isMobileSize={isMobileSize}
          loading={state.deletingPost}
          onBackdropClick={handleDialogClose}
          onClose={handleDialogClose}
          onConfirm={async () => {
            const code = await dispatch.DeletePost(state.post.id as number)
            if (code === 0) {
              history.replace(PathName.POST_ADMIN)
            }
          }}
          open={deleteDialog}
          title={'提示'}
        />
      )}
    </Fragment>
  )
}

export default PostAction
