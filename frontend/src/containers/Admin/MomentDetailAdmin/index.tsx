import React, { FC, Fragment } from 'react'
import { RouteConfig } from '@/routes'
import { RouteComponentProps } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// hooks
import useMomentDetailAdmin from './useMomentDetailAdmin'
import { CircularLoading } from '@/components/CircularLoading'

// components
import Action from './Action'
import AdvancedOptions from './AdvancedOptions'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    height: '100%',
    flexGrow: 1,
  },
  momentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.background.paper,
  },
  postItem: {
    paddingBottom: theme.spacing(4),
  },
}))
const MomentDetailAdmin: FC<RouteComponentProps & RouteConfig> = (props) => {
  const classes = useStyles()
  const { state } = useMomentDetailAdmin()
  return (
    <section className={classes.wrapper}>
      <Paper className={classes.momentWrapper}>
        {state.loadingMoment ? (
          <CircularLoading />
        ) : (
          <Fragment>
            <Action />
            <AdvancedOptions />
          </Fragment>
        )}
      </Paper>
    </section>
  )
}

export default MomentDetailAdmin
