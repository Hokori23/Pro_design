import { RouteWithSubRoutes } from '@/App'
import { RouteConfig } from '@/routes'
import React, { FC } from 'react'
import { RouteComponentProps, Switch } from 'react-router-dom'

const Sign: FC<RouteComponentProps & RouteConfig> = ({ routes }) => {
  return (
    <div>
      <Switch>
        {routes?.map((route) => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </Switch>
    </div>
  )
}
export default Sign
