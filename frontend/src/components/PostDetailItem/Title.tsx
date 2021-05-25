import React, { FC } from 'react'
import { PostWithAuthor } from '@/utils/Request/Post'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Typography } from '@material-ui/core'
import classnames from 'classnames'
import moment from 'moment'

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
    [theme.breakpoints.down('sm')]: {
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
  post: PostWithAuthor
}
export const Title: FC<TitleProps> = ({ post }) => {
  const classes = useStyles()
  const { title, coverUrl, pageViews, postComments, createdAt } = post
  return (
    <header className={classes.titleWrapper}>
      {coverUrl && (
        <figure className={classes.titleBanner}>
          <img src={coverUrl} />
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
          {title}
        </Typography>
        <Typography align="center" component="p">
          <Typography component="span" variant="caption">
            {/* TODO: 跳转到用户主页 */}
            <Link color="inherit" href="#">
              {post.author.userName}
            </Link>
          </Typography>
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <Typography component="span" variant="caption">
            访问数: {pageViews}
          </Typography>
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <Typography component="span" variant="caption">
            评论数: {postComments?.length || '0'}
          </Typography>
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <Typography component="span" variant="caption">
            发布时间: {moment(createdAt).format('ll')}
          </Typography>
        </Typography>
      </figure>
    </header>
  )
}
