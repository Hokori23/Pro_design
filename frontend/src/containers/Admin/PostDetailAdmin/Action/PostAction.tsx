import React, { FC, Fragment } from 'react'
import { Button, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'
import { PathName } from '@/routes'
import { useMobileSize } from '@/hooks/useScreenSize'

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
  const isMobileSize = useMobileSize()

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
