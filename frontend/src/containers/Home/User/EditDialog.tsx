import React, { FC } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '1.5rem',
  },
}))

interface EditDialogProps {
  title: string
  content?: string
  open: boolean
  valid: boolean
  handleClose: () => void
  handleSubmit: () => void
}
const EditDialog: FC<EditDialogProps> = ({
  title,
  content,
  open,
  valid,
  handleClose,
  handleSubmit,
  children,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Dialog
      disableBackdropClick
      fullScreen={isMobileSize}
      fullWidth
      maxWidth="xs"
      onClose={handleClose}
      open={open}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {content && <DialogContentText>{content}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions className={isMobileSize ? classes.actions : ''}>
        <Button
          color="primary"
          onClick={handleClose}
          size={isMobileSize ? 'large' : 'medium'}
          variant={isMobileSize ? 'outlined' : 'text'}
        >
          取消
        </Button>
        <Button
          color="primary"
          disabled={!valid}
          onClick={handleSubmit}
          size={isMobileSize ? 'large' : 'medium'}
          variant={isMobileSize ? 'contained' : 'outlined'}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default EditDialog
