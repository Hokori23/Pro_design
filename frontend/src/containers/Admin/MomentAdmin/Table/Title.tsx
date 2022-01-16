import React, { ReactElement } from 'react'
import InnerLink from '@/components/InnerLink'
import { PathName } from '@/routes'
import { PostWithAuthor } from '@/utils/Request/Post'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import makeStyles from '@mui/styles/makeStyles'

import EditIcon from '@mui/icons-material/Edit'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

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
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <div className={classes.title}>
      <InnerLink
        className={classes.titleText}
        to={`${PathName._MOMENT_DETAIL}/${Number(row.id)}`}
      >
        {row.content.slice(0, 30)}
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
        <InnerLink to={`${PathName._MOMENT_DETAIL_ADMIN}/${Number(row.id)}`}>
          <IconButton color="inherit" size={isMobileSize ? 'small' : 'medium'}>
            <EditIcon />
          </IconButton>
        </InnerLink>
      </div>
    </div>
  )
}
