/* eslint-disable react/display-name */
import React, { FC, forwardRef, Fragment, useMemo, useState } from 'react'
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  SvgIconTypeMap,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import {
  ExpandLess,
  ExpandMore,
  Build as BuildIcon,
  Home as HomeIcon,
  Edit as EditIcon,
  Article as ArticleIcon,
  ChatBubble as MomentIcon,
  Class as TagIcon,
  AccountCircle as UserIcon,
  Settings as SystemIcon,
} from '@mui/icons-material'
import { Option } from '@/utils/Request/Option'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import { PathName, RouteName } from '@/routes'
import { OverridableComponent } from '@mui/material/OverridableComponent'

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

const DrawerListCollapse: FC = React.memo(() => {
  const lists: Array<{
    label: string
    list: ListItemLinkProps[]
    icon?: JSX.Element
  }> = [
    {
      label: '撰写',
      list: [
        {
          icon: (<ArticleIcon />) as any,
          primary: RouteName.POST_DETAIL_ADMIN,
          to: PathName._POST_DETAIL_ADMIN,
        },
        {
          icon: (<MomentIcon />) as any,
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
        {
          icon: (<ArticleIcon />) as any,
          primary: RouteName.POST_ADMIN,
          to: PathName.POST_ADMIN,
        },
        {
          icon: (<MomentIcon />) as any,
          primary: RouteName.MOMENT_ADMIN,
          to: PathName.MOMENT_ADMIN,
        },
        {
          icon: (<TagIcon />) as any,
          primary: RouteName.POST_TAG_ADMIN,
          to: PathName.POST_TAG_ADMIN,
        },
        {
          icon: (<UserIcon />) as any,
          primary: RouteName.USER_ADMIN,
          to: PathName.USER_ADMIN,
        },
        {
          icon: (<SystemIcon />) as any,
          primary: RouteName.SYSTEM,
          to: PathName.SYSTEM,
        },
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
})

export const DrawerList: FC<DrawerListProps> = React.memo(
  ({ onClick, onKeyDown, blogConfig }) => {
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
  },
)
