import React, { ReactElement } from 'react'
import InnerLink from '@/components/InnerLink'
import { PathName } from '@/routes'
import { CellParams } from '@material-ui/data-grid'
import {
  IconButton,
  makeStyles,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { User } from '@/utils/Request/User'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  titleText: {
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
export const UserName = (props: CellParams): ReactElement => {
  const row = props.row as User
  const classes = useStyles()
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))
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

export const Email = (props: CellParams): ReactElement => {
  const row = props.row as User
  const classes = useStyles()
  return (
    <Tooltip arrow placement="bottom" title={row.email}>
      <div className={classes.titleText}>{row.email}</div>
    </Tooltip>
  )
}

export const createdAt = (props: CellParams): ReactElement => {
  const row = props.row as User
  const classes = useStyles()
  return (
    <Tooltip arrow placement="bottom" title={moment(row.createdAt).calendar()}>
      <div className={classes.titleText}>
        {moment(row.createdAt).calendar()}
      </div>
    </Tooltip>
  )
}
