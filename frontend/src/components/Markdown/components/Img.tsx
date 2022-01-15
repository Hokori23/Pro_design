import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { RenderProps } from './types'
import { Card, CardActionArea } from '@material-ui/core'

// components
import { CardMedia } from '@/components/CardMedia'

import { setUpYunImg } from '@/utils/tools'

interface CardMediaProps extends RenderProps {
  outline?: boolean
  inline?: boolean
  src: string
  onClick?: (imgUrl: string) => void
}
const useStyles = makeStyles((theme) => ({
  card: {
    margin: '1rem 0',
  },
  media: {
    cursor: 'pointer',
    height: '33vh',
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

const Img: FC<CardMediaProps> = ({
  outline,
  inline,
  src,
  onClick,
  ...props
}) => {
  const classes = useStyles()

  // 预加载原图
  const originSrc = setUpYunImg(src, 'origin')
  if (!outline) {
    const img = new Image()
    img.src = originSrc
  }

  return outline ? null : (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classnames(
            classes.media,
            inline ? classes.mediaInline : undefined,
          )}
          innerClassName={classnames(
            classes.mediaInner,
            inline ? classes.mediaInnerInline : undefined,
          )}
          onClick={() => onClick?.(originSrc)}
          showLoadingImg
          src={setUpYunImg(src, 'md')}
          {...props}
        />
      </CardActionArea>
    </Card>
  )
}
export default Img
