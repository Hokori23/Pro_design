import React, { FC } from 'react'
import { PostWithAuthor } from '@/utils/Request/Post'

// components
import { Title } from './Title'
import { Content } from './Content'
import { Comment } from './Comment'
import { Action } from './Action'
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'

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
  Retrieve: (id: string) => Promise<void>
}

export const PostDetailItem: FC<PostDetailItemProps> = ({ post, Retrieve }) => {
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
          Retrieve={Retrieve}
          isMobileSize={isMobileSize}
          post={post}
          postComments={post?.postComments}
        />
      </main>
    </section>
  )
}
