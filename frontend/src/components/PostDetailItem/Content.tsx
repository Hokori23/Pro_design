import { Post } from '@/utils/Request/Post'
import React, { FC } from 'react'
import makeStyles from '@mui/styles/makeStyles'
import { Renderer } from '@/components/Markdown/Renderer'

const useStyles = makeStyles((theme) => ({
  post: {
    padding: '1rem 2rem',
    borderBottom: '1px solid #e7e7e7',
    marginBottom: '1rem',
    [theme.breakpoints.up(700)]: {
      marginBottom: '2rem',
      width: 700,
      alignSelf: 'center',
    },
    flexGrow: 1,
  },
}))

interface ContentProps {
  post: Post
}
export const Content: FC<ContentProps> = ({ post }) => {
  const classes = useStyles()
  return <Renderer className={classes.post} content={post.content} />
}
