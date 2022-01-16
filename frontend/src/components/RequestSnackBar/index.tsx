import { store } from '@/store'
import {
  PropTypes,
  Snackbar,
  SnackbarCloseReason,
  SnackbarContentProps,
  SnackbarProps,
} from '@mui/material'
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'

export interface RequestSnackBarProps extends Partial<SnackbarProps> {
  message: SnackbarContentProps['message']
  color?: PropTypes.Color
  autoHideDuration?: number | null
  open?: boolean
  type?: AlertColor
  variant?: AlertProps['variant']
  onClose?: (...params: any) => void
}

export const RequestSnackBar: FC<RequestSnackBarProps> = ({
  message,
  color = 'primary',
  autoHideDuration = 3000,
  open = false,
  type = 'success',
  variant = 'filled',
  onClose,
}) => {
  const dispatch = useSelector(() => store.dispatch.common)
  const handleClose = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') return
    dispatch.CLOSE_AXIOS_SNACK_BAR()
    onClose?.()
  }
  const handleAlertClose = () => {
    dispatch.CLOSE_AXIOS_SNACK_BAR()
    onClose?.()
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={autoHideDuration}
      message={message}
      onClose={handleClose}
      open={open}
    >
      <MuiAlert onClose={handleAlertClose} severity={type} variant={variant}>
        {message}
      </MuiAlert>
    </Snackbar>
  )
}
