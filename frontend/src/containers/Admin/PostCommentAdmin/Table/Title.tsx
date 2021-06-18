import React, { ReactElement } from 'react'
import InnerLink from '@/components/InnerLink'
import { PathName } from '@/routes'
import { CellParams } from '@material-ui/data-grid'
import { makeStyles, Tooltip, Typography } from '@material-ui/core'
import { PostCommentWithAuthorPost } from '@/utils/Request/PostComment'

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  titleText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
export const Content = (props: CellParams): ReactElement => {
  const row = props.row as PostCommentWithAuthorPost
  const classes = useStyles()
  return (
    <div className={classes.title}>
      <Tooltip arrow placement="bottom" title={row.content}>
        <Typography>{row.content}</Typography>
      </Tooltip>
    </div>
  )
}

export const Author = (props: CellParams): ReactElement => {
  const row = props.row as PostCommentWithAuthorPost
  const classes = useStyles()
  return (
    <div className={classes.title}>
      {row.author ? (
        <InnerLink
          className={classes.titleText}
          to={`${PathName._USER_DETAIL}/${Number(row.author.id)}`}
        >
          {row.author.userName}
        </InnerLink>
      ) : (
        '游客'
      )}
    </div>
  )
}
