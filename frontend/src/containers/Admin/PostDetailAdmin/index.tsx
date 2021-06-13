import React, { FC, Fragment } from 'react'
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Paper,
} from '@material-ui/core'

import { RouteConfig } from '@/routes'
import { RouteComponentProps } from 'react-router-dom'

// hooks
import usePostDetailAdmin from './usePostDetailAdmin'

// components
import { CircularLoading } from '@/components/CircularLoading'
import { ScrollTop } from '@/components/ScrollTop'
import Editor from './Editor'
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
  postWrapper: {
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

const PostDetailAdmin: FC<RouteComponentProps & RouteConfig> = (props) => {
  const classes = useStyles()
  const { ref, state } = usePostDetailAdmin()

  return (
    <section className={classes.wrapper}>
      <Paper className={classes.postWrapper}>
        {state.loadingPost ? (
          <CircularLoading />
        ) : (
          <Fragment>
            <Action className={classes.postItem} />
            <AdvancedOptions className={classes.postItem} />
            <Editor className={classes.postItem} />
            <Backdrop className={classes.backdrop} open={state.backdropLoading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Fragment>
        )}
      </Paper>
      <ScrollTop {...props} ref={ref} />
    </section>
  )
}
export default PostDetailAdmin
