import React, { ReactElement } from 'react'
import InnerLink from '@/components/InnerLink'
import { PathName } from '@/routes'
import { PostWithAuthor } from '@/utils/Request/Post'
import { CellParams } from '@material-ui/data-grid'
import {
  IconButton,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

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
export const Title = (props: CellParams): ReactElement => {
  const row = props.row as PostWithAuthor
  const classes = useStyles()
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <div className={classes.title}>
      <InnerLink
        className={classes.titleText}
        to={`${PathName._POST_DETAIL}/${Number(row.id)}`}
      >
        {row.title}
      </InnerLink>
      <InnerLink to={`${PathName._POST_DETAIL_ADMIN}/${Number(row.id)}`}>
        <IconButton color="inherit" size={isMobileSize ? 'small' : 'medium'}>
          <EditIcon />
        </IconButton>
      </InnerLink>
    </div>
  )
}
