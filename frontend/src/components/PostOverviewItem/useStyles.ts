import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    maxWidth: '100%',
    margin: '10px 0 20px 0',
  },
  media: {
    height: '33vh',
  },
  mediaInner: {
    maxHeight: '33vh',
  },
  rootLink: {
    marginBottom: 10,
  },
  title: {
    display: 'inline-block',
    padding: '0 0.5em',
    marginBottom: '0.5em',
    borderBottom: '1px solid #e7e7e7',
    [theme.breakpoints.down('md')]: {
      padding: '0 0.5em 0 0',
    },
  },
  tagsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    },
  },
  tag: {
    maxWidth: '5rem',
    marginLeft: theme.spacing(1),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  actionsWrapper: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  actions: {
    display: 'flex',
    flex: 'auto',
    marginLeft: 10,
    '& > button': {
      marginRight: 10,
    },
  },
  actionsText: {
    marginRight: 10,
    '&:last-child': {
      marginRight: 15,
    },
  },
  content: {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 5,
    [theme.breakpoints.up(700)]: {
      padding: '0 0.5rem',
    },
  },
}))
