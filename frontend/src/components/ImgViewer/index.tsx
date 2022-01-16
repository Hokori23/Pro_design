import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react'
import { Dialog, IconButton, Button } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

import Draggable from 'react-draggable'

import CloseIcon from '@mui/icons-material/Close'

import Carousel from 'react-responsive-carousel'
import { CardMedia } from '@/components/CardMedia'
import classnames from 'classnames'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    zIndex: 2,
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  card: {
    margin: '1rem 0',
  },
  media: {
    cursor: 'pointer',
    height: '100vh',
  },
  mediaInner: {
    maxHeight: '33vh',
  },
  mediaInline: {
    height: 'auto',
    flex: '1 0 30%',
    margin: 0,
    padding: '1rem',
  },
  mediaInnerInline: {
    maxHeight: 'unset',
  },
}))

export interface ImgViewerMethods {
  setCurrentImg: (imgUrl: string) => void
  setImgs: (imgs: string[]) => void
  onOpen: () => void
  onClose: () => void
}
const _ImgViewer: ForwardRefRenderFunction<unknown, {}> = (_, ref) => {
  const classes = useStyles()

  const [show, setShow] = useState(false)
  const [imgs, setImgs] = useState<string[]>([])
  const [currentImg, setCurrentImg] = useState('')

  const onOpen = () => setShow(true)
  const onClose = () => setShow(false)
  useImperativeHandle(ref, () => ({
    setCurrentImg,
    setImgs,
    onOpen,
    onClose,
  }))

  return (
    <Dialog fullScreen onClose={onClose} open={show}>
      <IconButton
        className={classes.closeButton}
        onClick={onClose}
        size="large"
      >
        <CloseIcon />
      </IconButton>
      <CardMedia
        className={classnames(classes.media)}
        innerClassName={classnames(classes.mediaInner)}
        onClick={onClose}
        showLoadingImg
        src={currentImg}
      />
    </Dialog>
  )
}

export const ImgViewer = forwardRef(_ImgViewer)
