import { Post } from '@/utils/Request/Post'
import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Renderer } from '../Markdown/Renderer'

const useStyles = makeStyles((theme) => ({
  post: {
    padding: '1rem 0.5rem',
    borderBottom: '1px solid #e7e7e7',
    marginBottom: '1rem',
    [theme.breakpoints.up(700)]: {
      padding: '1rem 2rem',
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
