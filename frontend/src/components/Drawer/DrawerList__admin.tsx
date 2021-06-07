/* eslint-disable react/display-name */
import React, { FC, forwardRef, useMemo } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  makeStyles,
  SvgIconTypeMap,
} from '@material-ui/core'
import { Home as HomeIcon } from '@material-ui/icons'
import { Option } from '@/utils/Request/Option'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import { PathName, RouteName } from '@/routes'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'

import { drawerWidth } from './useStyles'
const useStyles = makeStyles({
  list: {
    width: drawerWidth,
  },
})

interface ListItemLinkProps {
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  primary: ListItemTextProps<'span', 'p'>['primary']
  to: LinkProps<unknown>['to']
}

const ListItemLink: FC<ListItemLinkProps> = ({ icon, primary, to }) => {
  const location = useLocation()
  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <Link ref={ref as any} to={to} {...itemProps} />
      )),
    [to],
  )

  return (
    <ListItem button component={renderLink} selected={to === location.pathname}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  )
}

export interface DrawerListProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  blogConfig: Option[]
}

export const DrawerList: FC<DrawerListProps> = ({
  onClick,
  onKeyDown,
  blogConfig,
}) => {
  const classes = useStyles()

  const lists: ListItemLinkProps[] = [
    {
      icon: (<HomeIcon />) as any,
      primary: RouteName.ADMIN,
      to: PathName.ADMIN,
    },
    // TODO:
    { primary: RouteName.POST, to: PathName.POST_OVERVIEW },
    { primary: RouteName.MOMENT, to: PathName.MOMENT_OVERVIEW },
  ]
  return (
    <nav>
      <div
        className={classes.list}
        onClick={onClick}
        onKeyDown={onKeyDown}
        role="presentation"
      >
        <List aria-label="menu" component="nav">
          {lists.map(({ icon, primary, to }) => (
            <ListItemLink
              icon={icon}
              key={String(to)}
              primary={primary}
              to={to}
            />
          ))}
        </List>
      </div>
    </nav>
  )
}