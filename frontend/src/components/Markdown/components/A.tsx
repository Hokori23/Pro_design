import React, { FC } from 'react'
import { Link } from '@material-ui/core'
import { RenderProps } from './types'

interface LinkProps extends RenderProps {
  outline?: boolean
}

const A: FC<LinkProps> = ({ outline, ...props }) => {
  return outline ? (
    <span>{props.children}</span>
  ) : (
    <Link
      component="a"
      rel="noopener"
      target="_blank"
      underline="hover"
      variant="body1"
      {...props}
    />
  )
}
export default A
