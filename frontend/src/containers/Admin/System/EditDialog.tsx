import React, { FC } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useMobileSize } from '@/hooks/useScreenSize'

const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '1.5rem',
  },
}))

interface EditDialogProps {
  title: string
  open: boolean
  loading: boolean
  handleClose: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
const EditDialog: FC<EditDialogProps> = ({
  title,
  open,
  loading,
  handleClose,
  handleSubmit,
  children,
}) => {
  const classes = useStyles()
  const isMobileSize = useMobileSize()
  return (
    <Dialog
      fullScreen={isMobileSize}
      fullWidth
      maxWidth="xs"
      onClose={handleClose}
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
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
              disabled={loading}
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
