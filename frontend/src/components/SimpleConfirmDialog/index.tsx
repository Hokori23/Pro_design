import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import React, { FC } from 'react'

interface SimpleConfirmDialogProps {
  open: boolean
  title?: string
  content?: string
  contentNode?: JSX.Element
  isMobileSize?: boolean
  handleClose: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onClose?: (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void
  onConfirm?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onBackdropClick?: (event: React.SyntheticEvent<{}, Event>) => void
}

export const SimpleConfirmDialog: FC<SimpleConfirmDialogProps> = ({
  open,
  title,
  content,
  contentNode: ContentNode,
  isMobileSize,
  handleClose,
  onClose,
  onConfirm,
  onBackdropClick,
}) => {
  return (
    <Dialog
      className="non-select"
      onBackdropClick={onBackdropClick}
      onClose={onClose}
      open={open}
    >
      <DialogTitle>
        <Typography color="primary" component="div" variant="h6">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {ContentNode || <DialogContentText>{content}</DialogContentText> ||
          null}
      </DialogContent>

      <DialogActions>
        <Button
          color="primary"
          onClick={handleClose}
          size={isMobileSize ? 'small' : 'medium'}
        >
          取消
        </Button>
        <Button
          autoFocus
          color="primary"
          onClick={onConfirm}
          size={isMobileSize ? 'small' : 'medium'}
          variant="outlined"
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  )
}