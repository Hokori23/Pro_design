import React, { FC } from 'react'
import { PostWithAuthor } from '@/utils/Request/Post'

// components
import { Title } from './Title'
import { Content } from './Content'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  post: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}))

interface PostDetailItemProps {
  post: PostWithAuthor
}

export const PostDetailItem: FC<PostDetailItemProps> = ({ post }) => {
  const classes = useStyles()
  return (
    <section className={classes.post}>
      <Title post={post} />
      <Content post={post} />
    </section>
  )
}
