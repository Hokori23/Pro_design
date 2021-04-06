import React, { FC } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'

const Redirect404: FC<RouteComponentProps> = ({ location }) => (
  <Redirect to={Object.assign({}, location, { state: { is404: true } })} />
)

export default Redirect404
