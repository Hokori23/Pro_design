/* eslint-disable react/display-name */
import React, { createRef, FC, forwardRef, ReactNode } from 'react'
import {
  AppBar as _AppBar,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
  Slide,
  SlideProps,
  AppBarProps as _AppBarProps,
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { isUndef } from '@/utils/tools'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const HideOnScroll = forwardRef<any, { children: ReactNode }>((props, ref) => {
  const { children } = props
  const trigger = useScrollTrigger()
  if (isUndef(children)) return null
  return (
    <Slide appear={false} direction="down" in={!trigger} ref={ref as any}>
      {children as SlideProps['children']}
    </Slide>
  )
})

export interface AppBarProps {
  id?: string
  title: string
  className?: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  suffix?: JSX.Element
  color?: _AppBarProps['color']
}
export const AppBar: FC<AppBarProps> = (props) => {
  const { id, title, onClick, className, suffix, color } = props
  const classes = useStyles()
  const ref = createRef()

  return (
    <HideOnScroll ref={ref}>
      <_AppBar className={className} color={color} position="sticky">
        <Toolbar id={id} variant="dense">
          <IconButton
            aria-label="menu"
            className={classes.menuButton}
            color="inherit"
            edge="start"
            onClick={onClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
          {suffix}
        </Toolbar>
      </_AppBar>
    </HideOnScroll>
  )
}
