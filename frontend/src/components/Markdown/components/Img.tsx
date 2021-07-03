import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { RenderProps } from './types'

// components
import { CardMedia } from '@/components/CardMedia'

interface CardMediaProps extends RenderProps {
  outline?: boolean
  inline?: boolean
}
const useStyles = makeStyles((theme) => ({
  media: {
    height: '33vh',
    margin: '1rem 0',
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

const Img: FC<CardMediaProps> = ({ outline, inline, ...props }) => {
  const classes = useStyles()
  return outline ? null : (
    <CardMedia
      {...props}
      className={classnames(
        classes.media,
        inline ? classes.mediaInline : undefined,
      )}
      innerClassName={classnames(
        classes.mediaInner,
        inline ? classes.mediaInnerInline : undefined,
      )}
    />
  )
}
export default Img
