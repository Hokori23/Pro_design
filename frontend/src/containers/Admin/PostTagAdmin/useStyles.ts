import { CommonState } from '@/common-model'
import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { computeDOMHeight } from '@/utils/tools'
export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  gap1: {
    flex: '1 1 10%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  gap2: {
    flex: '1 1 5%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  tags: {
    display: 'flex',
    flex: '1 1 60%',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
      paddingBottom: '5rem',
    },
    [theme.breakpoints.up('sm')]: {
      flex: '1 1 40%',
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  edit: {
    display: 'flex',
    width: '40%',
    flexGrow: 1,
    padding: '2rem 1rem',
    backgroundColor: theme.palette.background.paper,
    borderLeft: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('md')]: {
      paddingBottom: '5rem',
    },
    [theme.breakpoints.up('sm')]: {
      flex: '0 1 30%',
      padding: '2rem',
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))
export const computeStyles = (state: CommonState, theme: Theme) => {
  const init = state.mainHeight !== '0px'
  const emptyObj = {}
  const childStyle = init
    ? { height: state.mainHeight, overflow: 'auto' }
    : emptyObj
  const fabStyle = init
    ? {
        bottom:
          theme.spacing(2) + String(computeDOMHeight('#App-Footer', true)),
      }
    : emptyObj
  return { childStyle, fabStyle }
}
