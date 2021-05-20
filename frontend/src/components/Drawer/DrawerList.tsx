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
import { Link, LinkProps } from 'react-router-dom'
import { PathName } from '@/routes'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
})

interface ListItemLinkProps {
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  primary: ListItemTextProps<'span', 'p'>['primary']
  to: LinkProps<unknown>['to']
}

const ListItemLink: FC<ListItemLinkProps> = ({ icon, primary, to }) => {
  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <Link ref={ref as any} to={to} {...itemProps} />
      )),
    [to],
  )

  return (
    <ListItem button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  )
}

export interface DrawerListProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
  blogConfig: Option[]
}

export const DrawerList: FC<DrawerListProps> = ({
  onClick,
  onKeyDown,
  blogConfig,
}) => {
  const classes = useStyles()

  const blogName = blogConfig.find(
    (v) => v.module === 'system' && v.key === 'blogName',
  )?.value

  const lists: ListItemLinkProps[] = [
    { icon: (<HomeIcon />) as any, primary: blogName, to: PathName.HOME },
    { primary: '文章', to: PathName.POST_OVERVIEW },
    { primary: '说说', to: PathName.MOMENT_OVERVIEW },
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
