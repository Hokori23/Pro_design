import React, { FC, useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { RenderProps } from './types'
import { setUpYunImg } from '@/utils/tools'

// components
import { CardMedia } from '@/components/CardMedia'

interface CardMediaProps extends RenderProps {
  outline?: boolean
  inline?: boolean
  src: string
  onClick?: (originSrc: string) => void
}
const useStyles = makeStyles((theme) => ({
  media: {
    cursor: 'pointer',
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

const Img: FC<CardMediaProps> = ({
  outline,
  inline,
  src,
  onClick,
  ...props
}) => {
  const classes = useStyles()
  const [imgUrl] = useState(setUpYunImg(src, 'md'))

  // 预加载原图
  const originSrc = setUpYunImg(src, 'origin')
  if (!outline) {
    const img = new Image()
    img.src = originSrc
  }

  return outline
    ? null
    : useMemo(
        () => (
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
            src={imgUrl}
            {...props}
          />
        ),
        [imgUrl],
      )
}
export default Img
