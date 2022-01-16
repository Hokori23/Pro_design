import React, { FC } from 'react'
import {
  Drawer as _Drawer,
  SwipeableDrawer,
  useMediaQuery,
} from '@mui/material'
import { Option } from '@/utils/Request/Option'
import { useTheme } from '@mui/material/styles'

import { useStyles } from './useStyles'

// components
import { DrawerList } from './DrawerList'

const iOS =
  (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

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
  const isMobileSize = useMediaQuery(theme.breakpoints.down('md'))

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
          <DrawerList blogConfig={blogConfig} />
        </_Drawer>
      )}
    </nav>
  )
}
