import {
  IconButton,
  PropTypes,
  Snackbar,
  SnackbarCloseReason,
  SnackbarContentProps,
  SnackbarProps,
} from '@material-ui/core'
import { CloseIcon } from '@material-ui/data-grid'
import React, { FC, Fragment, MouseEvent, SyntheticEvent } from 'react'
import { store } from '@/store'

export interface RequestSnackBarProps extends Partial<SnackbarProps> {
  message: SnackbarContentProps['message']
  color?: PropTypes.Color
  autoHideDuration?: number | null
  open?: boolean
  onClose?:
    | ((
        event:
          | MouseEvent<HTMLButtonElement, MouseEvent>
          | SyntheticEvent<any, Event>,
        reason?: SnackbarCloseReason,
      ) => void)
    | undefined
}

export const RequestSnackBar: FC<RequestSnackBarProps> = ({
  message,
  color = 'primary',
  autoHideDuration = 3000,
  open = false,
  onClose,
}) => {
  const handlerClose = (
    e: SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason,
  ) => {
    store.dispatch.common.CLOSE_AXIOS_SNACK_BAR()
    onClose?.(e, reason)
  }
  const handlerClick = (e: MouseEvent<HTMLButtonElement>) => {
    store.dispatch.common.CLOSE_AXIOS_SNACK_BAR()
    onClose?.(e)
  }

  return (
    <Snackbar
      action={
        <Fragment>
          <IconButton
            aria-label="close"
            color={color}
            onClick={handlerClick}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Fragment>
      }
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={autoHideDuration}
      message={message}
      onClose={handlerClose}
      open={open}
    />
  )
}
