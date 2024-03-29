import makeStyles from '@mui/styles/makeStyles'

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
    textOverflow: 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 5,
    whiteSpace: 'break-spaces',
    padding: '0 32px',
  },
  contentText: {
    fontSize: 14,
  },
  Icon: {
    fontSize: 20,
    [theme.breakpoints.up(700)]: {
      fontSize: 25,
    },
  },
}))
