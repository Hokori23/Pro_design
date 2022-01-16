import React, { FC } from 'react'
import { AppBar, Tab, Tabs } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'
import { PathName } from '@/routes'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}))

export interface TabProps {
  text: string
  path: PathName
}
export interface NavigationProps {
  tabs: TabProps[]
  curTabIdx: number
  onChange: (event: React.ChangeEvent<{}>, newVal: number) => void
}
export const Navigation: FC<NavigationProps> = ({
  tabs,
  curTabIdx,
  onChange,
}) => {
  const classes = useStyles()
  return (
    <AppBar
      className={classes.root}
      color="default"
      component="nav"
      elevation={0}
      position="static"
    >
      <Tabs
        indicatorColor="primary"
        onChange={onChange}
        textColor="primary"
        value={curTabIdx}
        variant="fullWidth"
      >
        {tabs.map((tab) => (
          <Tab key={tab.text} label={tab.text} />
        ))}
      </Tabs>
    </AppBar>
  )
}
