import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    paddingBottom: '0.5rem',
    height: '100%',
  },
  tagWrapper: {
    [theme.breakpoints.up(700)]: {
      width: 700,
      alignSelf: 'center',
    },
    marginTop: '0.8rem',
    marginBottom: '1rem',
  },
  tagCard: {
    padding: '1rem 0',
    backgroundColor: theme.palette.background.paper,
  },
  tag: {
    flex: '1 0 50%',
    padding: '0 1rem',
  },
  description: {
    flex: '1 0 50%',
    padding: '0 1rem',
  },
  descriptionText: {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
    wordBreak: 'break-all',
  },
  descriptionTipText: {
    fontSize: '1rem',
  },
  posts: {
    [theme.breakpoints.up(700)]: {
      width: 700,
      alignSelf: 'center',
    },
    flexGrow: 1,
  },
  pagination: {
    marginBottom: 5,
    '& > ul': {
      justifyContent: 'center',
    },
  },
}))
