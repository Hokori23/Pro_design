import React, { ReactElement } from 'react'
import InnerLink from '@/components/InnerLink'
import { PathName } from '@/routes'
import { PostWithAuthor } from '@/utils/Request/Post'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { IconButton, Tooltip } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import LockIcon from '@mui/icons-material/Lock'
import { useMobileSize } from '@/hooks/useScreenSize'

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  titleText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
export const Title = (props: GridRenderCellParams): ReactElement => {
  const row = props.row as PostWithAuthor
  const classes = useStyles()
  const isMobileSize = useMobileSize()
  return (
    <Tooltip arrow placement="bottom" title={row.title || ''}>
      <div className={classes.title}>
        <InnerLink
          className={classes.titleText}
          to={`${PathName._POST_DETAIL}/${Number(row.id)}`}
        >
          {row.title}
        </InnerLink>
        <div>
          {!!row.isHidden && (
            <IconButton
              color="inherit"
              disabled
              size={isMobileSize ? 'small' : 'medium'}
            >
              <VisibilityOffIcon />
            </IconButton>
          )}
          {!!row.isLocked && (
            <IconButton
              color="inherit"
              disabled
              size={isMobileSize ? 'small' : 'medium'}
            >
              <LockIcon />
            </IconButton>
          )}
          <InnerLink to={`${PathName._POST_DETAIL_ADMIN}/${Number(row.id)}`}>
            <IconButton
              color="inherit"
              size={isMobileSize ? 'small' : 'medium'}
            >
              <EditIcon />
            </IconButton>
          </InnerLink>
        </div>
      </div>
    </Tooltip>
  )
}

export const Tags = (props: GridRenderCellParams): ReactElement => {
  const row = props.row as PostWithAuthor
  const classes = useStyles()
  const tags = row.tags.map((tag) => tag.name).join(', ')
  return (
    <Tooltip arrow placement="bottom" title={tags}>
      <div className={classes.titleText}>{tags}</div>
    </Tooltip>
  )
}
