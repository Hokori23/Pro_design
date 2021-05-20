import React, { FC } from 'react'
import {
  Drawer as _Drawer,
  SwipeableDrawer,
  useMediaQuery,
} from '@material-ui/core'
import { Option } from '@/utils/Request/Option'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { DrawerList } from './DrawerList'

const iOS =
  (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

interface DrawerProps {
  onClose: (event: React.SyntheticEvent<{}, Event>) => void
  onOpen: (event: React.SyntheticEvent<{}, Event>) => void
  open: boolean
  blogConfig: Option[]
}

export const Drawer: FC<DrawerProps> = ({
  onOpen,
  onClose,
  open,
  blogConfig,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <nav>
      {isMobileSize ? (
        <SwipeableDrawer
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          onClose={onClose}
          onOpen={onOpen}
          open={open}
        >
          <DrawerList
            blogConfig={blogConfig}
            onClick={onClose}
            onKeyDown={onClose}
          />
        </SwipeableDrawer>
      ) : (
        <_Drawer
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          className={classes.drawer}
          open={open}
          variant="persistent"
        >
          <DrawerList
            blogConfig={blogConfig}
            onClick={onClose}
            onKeyDown={onClose}
          />
        </_Drawer>
      )}
    </nav>
  )
}
