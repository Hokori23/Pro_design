import React, { ReactElement } from 'react'
import InnerLink from '@/components/InnerLink'
import { PathName } from '@/routes'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { IconButton, Tooltip } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import EditIcon from '@mui/icons-material/Edit'
import { User } from '@/utils/Request/User'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
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
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
export const UserName = (props: GridRenderCellParams): ReactElement => {
  const row = props.row as User
  const classes = useStyles()
  const isMobileSize = useMobileSize()
  return (
    <Tooltip arrow placement="bottom" title={row.userAccount}>
      <div className={classes.title}>
        <InnerLink
          className={classes.titleText}
          to={`${PathName._USER_DETAIL}/${Number(row.id)}`}
        >
          {row.userAccount}
        </InnerLink>
        <InnerLink to={`${PathName._USER_DETAIL_ADMIN}/${Number(row.id)}`}>
          <IconButton color="inherit" size={isMobileSize ? 'small' : 'medium'}>
            <EditIcon />
          </IconButton>
        </InnerLink>
      </div>
    </Tooltip>
  )
}

export const Email = (props: GridRenderCellParams): ReactElement => {
  const row = props.row as User
  const classes = useStyles()
  return (
    <Tooltip arrow placement="bottom" title={row.email}>
      <div className={classes.titleText}>{row.email}</div>
    </Tooltip>
  )
}

export const createdAt = (props: GridRenderCellParams): ReactElement => {
  const row = props.row as User
  const classes = useStyles()
  const time = formatDistanceToNow(
    new Date((row.createdAt as unknown) as string),
    {
      locale: zhCN,
      addSuffix: true,
    },
  )
  return (
    <Tooltip arrow placement="bottom" title={time}>
      <div className={classes.titleText}>{time}</div>
    </Tooltip>
  )
}
