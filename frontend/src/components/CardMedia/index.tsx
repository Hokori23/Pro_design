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
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },
  failImgBox: {
    height: '100%',
    width: '100%',
    margin: 0,
  },
}))

interface CardMediaProps {
  className?: string
  innerClassName?: string
  component?: React.ElementType<any>
  image?: string
  src?: string
  alt?: string
  onError?: Function
  onLoad?: Function
  title?: string
}
export const CardMedia: FC<CardMediaProps> = ({
  className,
  innerClassName,
  component = 'img',
  image,
  src,
  alt,
  onError,
  onLoad,
  title,
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
              loading ? 'hidden' : '',
            )}
            component={component}
            image={image || src}
            onError={handleOnError}
            onLoad={handleOnLoad}
            title={title || alt}
          />
        )}
      </section>
    </Fragment>
  )
}
