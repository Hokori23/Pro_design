import React, { FC } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material'
import { PostTag } from '@/utils/Request/PostTag'

interface DeleteDialogProps {
  open: boolean
  isMobileSize: boolean
  deleteTag: PostTag | null
  loading: boolean
  onBackdropClick: () => void
  onClose: () => void
  onDelete: () => Promise<boolean | undefined>
}
const DeleteDialog: FC<DeleteDialogProps> = ({
  open,
  isMobileSize,
  deleteTag,
  loading,
  onBackdropClick,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog onBackdropClick={onBackdropClick} onClose={onClose} open={open}>
      <DialogTitle>提示</DialogTitle>
      <DialogContent>
        <DialogContentText>
          确定要删除标签
          {deleteTag ? (
            <Typography
              color="primary"
              component="span"
              style={{ margin: '0 3px', fontWeight: 600 }}
            >
              {deleteTag.name}
            </Typography>
          ) : (
            ''
          )}
          ？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          disabled={loading}
          onClick={onClose}
          size={isMobileSize ? 'small' : 'medium'}
        >
          取消
        </Button>
        <div style={{ position: 'relative' }}>
          <Button
            autoFocus
            color="primary"
            disabled={loading}
            onClick={async () => {
              if (await onDelete()) {
                onClose()
              }
            }}
            size={isMobileSize ? 'small' : 'medium'}
            variant="outlined"
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
    </Dialog>
  )
}

export default DeleteDialog
