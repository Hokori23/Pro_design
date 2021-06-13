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
import useAction from './useAction'

// components
import { Input } from '@/components/Input'
import MomentAction from './MomentAction'
import classnames from 'classnames'

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
  postAction: {
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },
  tags: {
    minHeight: 50,
    width: '100%',
  },
}))

interface ActionProps {
  className?: string
}
const Action: FC<ActionProps> = ({ className }) => {
  const classes = useStyles()
  const { state, open, handleOpen, onMomentChange } = useAction()

  return (
    <header>
      <ListItem button className={classes.parentListItem} onClick={handleOpen}>
        <ListItemIcon className={classes.parentIcon}>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="说说信息" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className={className} component="div" disablePadding>
          <ListItem
            className={classnames(classes.listItem, classes.postAction)}
          >
            <MomentAction />
          </ListItem>
          <ListItem className={classes.listItem}>
            <Input
              fullWidth
              label=""
              multiline
              onChange={(e) => {
                onMomentChange({ content: e.target.value })
              }}
              placeholder="输入说说内容..."
              value={state.moment.content}
            />
          </ListItem>
        </List>
      </Collapse>
    </header>
  )
}

export default Action
