import React, { FC } from 'react'

// components
import { Title } from './Title'
import { Content } from './Content'
import { Comment } from './Comment'
import { Action } from './Action'
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
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
  post: PostWithAuthor
}
export const PostDetailItem: FC<PostDetailItemProps> = ({ post }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <section className={classes.post}>
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
    </section>
  )
}
