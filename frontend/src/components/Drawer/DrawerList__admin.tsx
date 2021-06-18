/* eslint-disable react/display-name */
import React, { FC, forwardRef, Fragment, useMemo, useState } from 'react'
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  makeStyles,
  SvgIconTypeMap,
} from '@material-ui/core'
import {
  ExpandLess,
  ExpandMore,
  Build as BuildIcon,
  Home as HomeIcon,
  Edit as EditIcon,
} from '@material-ui/icons'
import { Option } from '@/utils/Request/Option'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import { PathName, RouteName } from '@/routes'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'

import { drawerWidth } from './useStyles'
const useStyles = makeStyles((theme) => ({
  list: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

interface ListItemLinkProps {
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  primary: ListItemTextProps<'span', 'p'>['primary']
  to: LinkProps<unknown>['to']
  className?: string
}

const ListItemLink: FC<ListItemLinkProps> = ({
  className,
  icon,
  primary,
  to,
}) => {
  const location = useLocation()
  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <Link ref={ref as any} to={to} {...itemProps} />
      )),
    [to],
  )

  return (
    <ListItem
      button
      className={className}
      component={renderLink}
      selected={to === location.pathname}
    >
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

const DrawerListCollapse: FC = () => {
  const lists: Array<{
    label: string
    list: ListItemLinkProps[]
    icon?: JSX.Element
  }> = [
    {
      label: '撰写',
      list: [
        {
          primary: RouteName.POST_DETAIL_ADMIN,
          to: PathName._POST_DETAIL_ADMIN,
        },
        {
          primary: RouteName.MOMENT_DETAIL_ADMIN,
          to: PathName._MOMENT_DETAIL_ADMIN,
        },
      ],
      icon: (
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
      ),
    },
    {
      label: '管理',
      list: [
        { primary: RouteName.POST_ADMIN, to: PathName.POST_ADMIN },
        { primary: RouteName.MOMENT_ADMIN, to: PathName.MOMENT_ADMIN },
        { primary: RouteName.POST_TAG_ADMIN, to: PathName.POST_TAG_ADMIN },
        { primary: RouteName.USER_ADMIN, to: PathName.USER_ADMIN },
        {
          primary: RouteName.POST_COMMENT_ADMIN,
          to: PathName.POST_COMMENT_ADMIN,
        },
        { primary: RouteName.SYSTEM, to: PathName.SYSTEM },
      ],
      icon: (
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
      ),
    },
  ]
  const classes = useStyles()
  const [open, setOpen] = useState(-1)
  const handleToggle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number,
  ) => {
    e.stopPropagation()
    if (idx === -1 || idx === open) {
      setOpen(-1)
    } else {
      setOpen(idx)
    }
  }
  return (
    <Fragment>
      {lists.map(({ label, list, icon }, idx) => (
        <Fragment key={idx}>
          <ListItem
            button
            onClick={(e) => {
              handleToggle(e, idx)
            }}
          >
            {icon}
            <ListItemText primary={label} />
            {open === idx ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open === idx} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {list.map(({ icon, primary, to }) => (
                <ListItemLink
                  className={classes.nested}
                  icon={icon}
                  key={String(to)}
                  primary={primary}
                  to={to}
                />
              ))}
            </List>
          </Collapse>
        </Fragment>
      ))}
    </Fragment>
  )
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
        <DrawerListCollapse />
      </div>
    </nav>
  )
}
