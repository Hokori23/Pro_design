/* eslint-disable react/display-name */
import React, { FC, forwardRef } from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import { Link } from '@material-ui/core'

const InnerLink: FC<RouterLinkProps> = forwardRef(
  ({ className, style, to, replace, children }, ref) => {
    return (
      <Link
        className={className}
        component={RouterLink}
        replace={replace}
        style={style}
        to={to}
      >
        {children}
      </Link>
    )
  },
)
export default InnerLink
