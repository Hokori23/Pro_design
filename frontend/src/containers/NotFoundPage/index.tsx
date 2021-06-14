import React, { FC, useEffect } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { RouteName } from '@/routes'
import './index.less'
import { store } from '@/store'
import { useSelector } from 'react-redux'

const NotFoundPage: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useSelector(() => store.dispatch.common)
  useEffect(() => {
    dispatch.SET_APPBAR_TITLE(RouteName.NOT_FOUND_PAGE)
  }, [])
  return (
    <div className="not-found-404">
      <div className="not-found-404__backward">
        <IconButton
          aria-label="back"
          onClick={() => {
            history.goBack()
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </div>
      <Typography variant="h1">404</Typography>
    </div>
  )
}
export default withRouter(NotFoundPage)
