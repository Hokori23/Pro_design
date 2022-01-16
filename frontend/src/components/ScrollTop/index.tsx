/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import { useScrollTrigger, Zoom, Fab } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

export const ScrollTop = forwardRef((props, ref) => {
  const classes = useStyles()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const anchor = document.querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
  return (
    <Zoom in={trigger}>
      <div
        className={classes.root}
        onClick={handleClick}
        ref={ref as any}
        role="presentation"
      >
        <Fab color="secondary" size="small">
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  )
})
