import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginBottom: '20px',
  },
  actionsWrapper: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 'auto',
    marginRight: 20,
    '& .MuiButtonBase-root.MuiIconButton-root': {
      padding: 5,
    },
  },
  actionItem: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
  },
  content: {
    display: '-webkit-box',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 5,
    padding: '0 32px',
  },
  Icon: {
    fontSize: 20,
    [theme.breakpoints.up(700)]: {
      fontSize: 25,
    },
  },
}))
