import React, { FC, Fragment } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'

// hooks
import usePostAction from './usePostAction'
import { CircularLoading } from '@/components/CircularLoading'
import { PathName } from '@/routes'

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

  const DeleteDialog = (
    <Dialog
      onBackdropClick={handleDialogClose}
      onClose={handleDialogClose}
      open={deleteDialog}
    >
      <DialogTitle>提示</DialogTitle>
      <DialogContent>
        <DialogContentText>确定要删除该文章吗？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          disabled={state.deletingPost}
          onClick={handleDialogClose}
          size={isMobileSize ? 'small' : 'medium'}
        >
          取消
        </Button>
        <div className="relative">
          <Button
            autoFocus
            color="primary"
            disabled={state.deletingPost}
            onClick={async () => {
              const code = await dispatch.DeletePost(state.post.id as number)
              if (code === 0) {
                history.replace(PathName.POST_ADMIN)
              }
            }}
            size={isMobileSize ? 'small' : 'medium'}
            variant="outlined"
          >
            确定
          </Button>
          {state.deletingPost && <CircularLoading size={20} />}
        </div>
      </DialogActions>
    </Dialog>
  )
  return (
    <Fragment>
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
      <Button
        className={classes.button}
        color="primary"
        onClick={dispatch.SavePost}
        size={isMobileSize ? 'small' : 'medium'}
        startIcon={<SaveIcon />}
        variant="contained"
      >
        保存
      </Button>
      {DeleteDialog}
    </Fragment>
  )
}

export default PostAction
