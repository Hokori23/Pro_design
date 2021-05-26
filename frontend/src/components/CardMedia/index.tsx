import React, { FC, Fragment, useState } from 'react'
import {
  CardMedia as _CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core'
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
  },
}))

interface CardMediaProps {
  className?: string
  innerClassName?: string
  component?: React.ElementType<any>
  image?: string
  onError?: Function
  onLoad?: Function
  title?: string
}
export const CardMedia: FC<CardMediaProps> = ({
  className,
  innerClassName,
  component = 'img',
  image,
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
      <div className={classnames(classes.className, className)}>
        {loading && <CircularLoading></CircularLoading>}
        {failed ? (
          <div className={classnames(classes.failImgBox, 'flex flex-center')}>
            <div className="flex flex-column flex-center">
              <Typography
                align="center"
                color="primary"
                gutterBottom
                variant="h4"
              >
                找不到图片...
              </Typography>
              <BrokenImageIcon color="action" fontSize="large" />
            </div>
          </div>
        ) : (
          <_CardMedia
            className={classnames(
              classes.innerClassName,
              innerClassName,
              loading ? 'hidden' : '',
            )}
            component={component}
            image={image}
            onError={handleOnError}
            onLoad={handleOnLoad}
            title={title}
          />
        )}
      </div>
      {/* <_CardMedia
        className={className}
        component={component}
        image={image}
        onError={onError}
        onLoad={onLoad}
        title={title}
      /> */}
    </Fragment>
  )
}
