import React, { FC, Fragment } from 'react'
import { ListItem, ListItemText, Typography, Divider } from '@material-ui/core'

interface ListItemValueProps {
  primary: string
  className?: string
  innerClassName?: string
  value?: string
  onClick?: () => void
  disabled?: boolean
}
export const ListItemValue: FC<ListItemValueProps> = ({
  primary,
  className,
  innerClassName,
  value,
  onClick,
  disabled,
}) => (
  <Fragment>
    <ListItem button disabled={disabled} onClick={onClick}>
      <ListItemText primary={primary} />
      <ListItemText className={className} disableTypography>
        <Typography className={innerClassName} color="textSecondary">
          {value}
        </Typography>
      </ListItemText>
    </ListItem>
    <Divider light />
  </Fragment>
)
