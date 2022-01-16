import React, { FC } from 'react'
import makeStyles from '@mui/styles/makeStyles'
import classnames from 'classnames'
import { Typography } from '@mui/material'
import { setUpYunImg } from '@/utils/tools'

const useStyles = makeStyles((theme) => ({
  titleWrapper: {
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
  },
  titleBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    filter: 'brightness(.6)',
    margin: 0,
    '& > img': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
  titleTextWrapper: {
    [theme.breakpoints.down('md')]: {
      padding: '50px 1rem',
    },
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '70px 45px',
    margin: 0,
    color: '#fff',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  titleTextWrapperNoBanner: {
    paddingBottom: 25,
    color: '#000',
  },
  titleText: {
    wordBreak: 'break-word',
  },
}))

interface TitleProps {
  title: string
  coverUrl?: string
}
export const Title: FC<TitleProps> = ({ title, coverUrl }) => {
  const classes = useStyles()

  return (
    <header
      className={classes.titleWrapper}
      style={{ marginBottom: coverUrl ? '1rem' : 0 }}
    >
      {coverUrl && (
        <figure className={classes.titleBanner}>
          <img src={setUpYunImg(coverUrl, 'md')} />
        </figure>
      )}
      <figure
        className={
          coverUrl
            ? classes.titleTextWrapper
            : classnames(
                classes.titleTextWrapper,
                classes.titleTextWrapperNoBanner,
              )
        }
      >
        <Typography
          align="center"
          className={classes.titleText}
          component="figcaption"
          gutterBottom
          variant="h3"
        >
          {title || '请输入标题...'}
        </Typography>
      </figure>
    </header>
  )
}
