import React, { FC } from 'react'
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import { ExpandLess, ExpandMore, Edit as EditIcon } from '@material-ui/icons'

// hooks
import useAdvancedOptions from './useAdvancedOptions'

// components
import CheckOptions from './CheckOptions'

const useStyles = makeStyles((theme) => ({
  parentListItem: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.getContrastText(theme.palette.grey[300]),
    },
  },
  parentIcon: {
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    '&:hover': {
      color: theme.palette.getContrastText(theme.palette.grey[300]),
    },
  },
  listItem: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      maxWidth: 500,
    },
  },
  tags: {
    minHeight: 50,
    width: '100%',
  },
}))

const Action: FC = () => {
  const classes = useStyles()
  const { state, openAction, setPost, handleOpenAction } = useAdvancedOptions()
  return (
    <header>
      <ListItem
        button
        className={classes.parentListItem}
        onClick={handleOpenAction}
      >
        <ListItemIcon className={classes.parentIcon}>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="更多设置" />
        {openAction ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openAction} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.listItem}>
            <CheckOptions onChange={setPost} post={state.post} />
          </ListItem>
        </List>
      </Collapse>
    </header>
  )
}

export default Action
