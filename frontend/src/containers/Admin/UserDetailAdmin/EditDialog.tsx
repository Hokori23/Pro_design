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
  CircularProgress,
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
  loading: boolean
  handleClose: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
const EditDialog: FC<EditDialogProps> = ({
  title,
  content,
  open,
  valid,
  loading,
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
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {content && <DialogContentText>{content}</DialogContentText>}
          {children}
        </DialogContent>
        <DialogActions className={isMobileSize ? classes.actions : ''}>
          <Button
            color="primary"
            disabled={loading}
            onClick={handleClose}
            size={isMobileSize ? 'large' : 'medium'}
            variant={isMobileSize ? 'outlined' : 'text'}
          >
            取消
          </Button>
          <div style={{ position: 'relative' }}>
            <Button
              color="primary"
              disabled={!valid || loading}
              size={isMobileSize ? 'large' : 'medium'}
              type="submit"
              variant={isMobileSize ? 'contained' : 'outlined'}
            >
              确定
            </Button>
            {loading && (
              <CircularProgress
                size={20}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  marginTop: -10,
                  marginLeft: -10,
                }}
              />
            )}
          </div>
        </DialogActions>
      </form>
    </Dialog>
  )
}
export default EditDialog
