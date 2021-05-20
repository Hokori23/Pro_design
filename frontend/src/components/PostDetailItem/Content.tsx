import { Post } from '@/utils/Request/Post'
import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Renderer } from '../Markdown/Renderer'

const useStyles = makeStyles((theme) => ({
  post: {
    [theme.breakpoints.up(700)]: {
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
