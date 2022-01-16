import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import React, { FC } from 'react'

interface SimpleAlertDialogProps {
  open: boolean
  title?: string
  content?: string
  contentNode?: JSX.Element
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void
}

export const SimpleAlertDialog: FC<SimpleAlertDialogProps> = ({
  open,
  title,
  content,
  contentNode: ContentNode,
  handleClose,
  onClose,
}) => {
  return (
    <Dialog className="non-select" onClose={onClose} open={open}>
      <DialogTitle>
        <Typography color="primary" component="div" variant="h6">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>{ContentNode || content || null}</DialogContent>

      <DialogActions>
        <Button
          autoFocus
          color="primary"
          onClick={handleClose}
          variant="contained"
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  )
}
