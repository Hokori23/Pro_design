import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    height: '100%',
  },
  system: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up(700)]: {
      width: 700,
      alignSelf: 'center',
    },
    flexGrow: 1,
  },
  systemItem: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  ValueWrapper: {
    textAlign: 'right',
    marginRight: 24,
    flex: '1 1 120px',
  },
  ValueInner: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))
