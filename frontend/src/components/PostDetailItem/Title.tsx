import React, { FC } from 'react'
import { PostWithAuthor } from '@/utils/Request/Post'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import classnames from 'classnames'
import moment from 'moment'
import { PathName } from '@/routes'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Group } from '@/utils/Request/User'

import InnerLink from '@/components/InnerLink'
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
  link: {
    fontWeight: 600,
    letterSpacing: 1,
  },
  linkWithCover: {
    color: theme.palette.background.paper,
  },
}))

interface TitleProps {
  post: PostWithAuthor
}
export const Title: FC<TitleProps> = ({ post }) => {
  const classes = useStyles()
  const state = useSelector((state: RootState) => state.common)

  const { title, coverUrl, author, pageViews, postComments, createdAt } = post
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
        <Typography
          align="center"
          component="p"
          gutterBottom={(state.userInfo.group || 0) > Group.SUBSCRIBER}
        >
          <Typography component="span" variant="caption">
            <InnerLink
              className={classnames(
                classes.link,
                coverUrl ? classes.linkWithCover : '',
              )}
              to={`${PathName._USER_DETAIL}/${String(author.id)}`}
            >
              {post.author.userName}
            </InnerLink>
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
            发布时间: {moment(createdAt).calendar()}
          </Typography>
        </Typography>
        {(state.userInfo.group || 0) > Group.SUBSCRIBER && (
          <Typography component="span" variant="caption">
            <InnerLink
              className={classnames(
                classes.link,
                coverUrl ? classes.linkWithCover : '',
              )}
              to={`${PathName._POST_DETAIL_ADMIN}/${String(post.id)}`}
            >
              编辑
            </InnerLink>
          </Typography>
        )}
      </figure>
    </header>
  )
}
