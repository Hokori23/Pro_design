import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginBottom: '20px',
  },
  media: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    maxHeight: '33vh',
  },
  rootLink: {
    marginBottom: 10,
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
    'text-overflow': 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 5,
  },
}))
