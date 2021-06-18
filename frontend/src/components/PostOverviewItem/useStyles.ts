import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginBottom: '20px',
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
    [theme.breakpoints.down('sm')]: {
      padding: '0 0.5em 0 0',
    },
  },
  tagsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
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
