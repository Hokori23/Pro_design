import React, { FC } from 'react'
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { ExpandLess, ExpandMore, Settings } from '@mui/icons-material'

// hooks
import useAdvancedOptions from './useAdvancedOptions'

// components
import CheckOptions from './CheckOptions'
import InputOptions from './InputOptions'

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

interface AdvancedOptionsProps {
  className?: string
}
const AdvancedOptions: FC<AdvancedOptionsProps> = ({ className }) => {
  const classes = useStyles()
  const {
    state,
    openAction,
    setMoment,
    handleOpenAction,
  } = useAdvancedOptions()
  return (
    <header>
      <ListItem
        button
        className={classes.parentListItem}
        onClick={handleOpenAction}
      >
        <ListItemIcon className={classes.parentIcon}>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="更多设置" />
        {openAction ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openAction} timeout="auto" unmountOnExit>
        <List className={className} component="div" disablePadding>
          <ListItem className={classes.listItem}>
            <CheckOptions moment={state.moment} onChange={setMoment} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <InputOptions moment={state.moment} onChange={setMoment} />
          </ListItem>
        </List>
      </Collapse>
    </header>
  )
}

export default AdvancedOptions
