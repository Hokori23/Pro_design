import React, { FC, Fragment } from 'react'

// components
import { Title } from './Title'
import { Content } from './Content'
import { Comment } from './Comment'
import { Action } from './Action'
import { Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { PostWithAuthor } from '@/utils/Request/Post'

const useStyles = makeStyles((theme) => ({
  post: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  postMain: {
    [theme.breakpoints.up(700)]: {
      width: 700,
      alignSelf: 'center',
    },
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}))

interface PostDetailItemProps {
  post: PostWithAuthor | null
}
export const PostDetailItem: FC<PostDetailItemProps> = ({ post }) => {
  const classes = useStyles()
  const isMobileSize = useMobileSize()

  return (
    <section className={classes.post}>
      {post ? (
        <Fragment>
          <Title post={post} />
          <main className={classes.postMain}>
            <Content post={post} />
            <Action isMobileSize={isMobileSize} post={post} />
            <Comment
              isMobileSize={isMobileSize}
              postComments={post?.postComments}
            />
            <footer id="post-detail-footer"></footer>
          </main>
        </Fragment>
      ) : (
        <div className="spread-box flex flex-center">
          <Typography align="center" color="primary" variant="h3">
            该文章不存在
          </Typography>
        </div>
      )}
    </section>
  )
}
