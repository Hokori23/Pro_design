import React, { FC, Fragment, useState } from 'react'
import { CardMedia as _CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import BrokenImageIcon from '@material-ui/icons/BrokenImage'

// components
import { CircularLoading } from '@/components/CircularLoading'

const useStyles = makeStyles((theme) => ({
  className: {
    position: 'relative',
    overflow: 'hidden',
  },
  innerClassName: {
    transition: 'filter',
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },
  failImgBox: {
    height: '100%',
    width: '100%',
    margin: 0,
  },
  blur: {
    filter: 'brightness(0.8) blur(4px)',
  },
}))

interface CardMediaProps {
  className?: string
  innerClassName?: string
  component?: React.ElementType<any>
  src?: string
  alt?: string
  onError?: Function
  onLoad?: Function
  title?: string
  showLoadingImg?: boolean
  onClick?: (...params: any[]) => void
}
export const CardMedia: FC<CardMediaProps> = ({
  className,
  innerClassName,
  component = 'img',
  src,
  alt,
  onError,
  onLoad,
  title,
  showLoadingImg,
  onClick,
  ...props
}) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  const handleOnLoad = () => {
    onLoad?.()
    setLoading(false)
  }

  const handleOnError = () => {
    onError?.()
    setLoading(false)
    setFailed(true)
  }

  return (
    <Fragment>
      <section className={classnames(classes.className, className)}>
        {loading && <CircularLoading></CircularLoading>}
        {failed ? (
          <figure
            className={classnames(classes.failImgBox, 'flex flex-center')}
          >
            <figcaption className="flex flex-column flex-center">
              <Typography
                align="center"
                color="primary"
                gutterBottom
                variant="h4"
              >
                找不到图片...
              </Typography>
              <BrokenImageIcon color="action" fontSize="large" />
            </figcaption>
          </figure>
        ) : (
          <_CardMedia
            className={classnames(
              classes.innerClassName,
              innerClassName,
              loading && !showLoadingImg ? 'hidden' : '',
              loading && showLoadingImg ? classes.blur : '',
            )}
            component={component}
            image={src}
            onClick={onClick}
            onError={handleOnError}
            onLoad={handleOnLoad}
            title={title || alt}
            {...props}
          />
        )}
      </section>
    </Fragment>
  )
}
