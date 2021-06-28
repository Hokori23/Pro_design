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
import SendIcon from '@material-ui/icons/Send'

// hooks
import useMomentAction from './useMomentAction'
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

const MomentAction: FC = () => {
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
  } = useMomentAction()

  const DeleteDialog = (
    <Dialog
      onBackdropClick={handleDialogClose}
      onClose={handleDialogClose}
      open={deleteDialog}
    >
      <DialogTitle>提示</DialogTitle>
      <DialogContent>
        <DialogContentText>确定要删除该说说吗？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          disabled={state.deletingMoment}
          onClick={handleDialogClose}
          size={isMobileSize ? 'small' : 'medium'}
        >
          取消
        </Button>
        <div className="relative">
          <Button
            autoFocus
            color="primary"
            disabled={state.deletingMoment}
            onClick={async () => {
              const code = await dispatch.DeleteMoment(
                state.moment.id as number,
              )
              if (code === 0) {
                history.replace(PathName.POST_ADMIN)
              }
            }}
            size={isMobileSize ? 'small' : 'medium'}
            variant="outlined"
          >
            确定
          </Button>
          {state.deletingMoment && <CircularLoading size={20} />}
        </div>
      </DialogActions>
    </Dialog>
  )
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
          onClick={dispatch.CreateMoment}
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
          onClick={dispatch.EditMoment}
          size={isMobileSize ? 'small' : 'medium'}
          startIcon={<SaveIcon />}
          variant="contained"
        >
          保存
        </Button>
      )}
      {!state.isNew && DeleteDialog}
    </Fragment>
  )
}

export default MomentAction
