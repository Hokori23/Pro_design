import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  commentBox: {
    borderRadius: 5,
    padding: '1rem',
    marginBottom: '1rem',
  },
  commentForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  commentHeader: {
    marginBottom: '1rem',
    fontWeight: 600,
  },
  commentCommenter: {
    display: 'flex',
    marginBottom: '1rem',
  },
  commentCommenterItem: {
    marginRight: '1rem',
    '&:last-child': {
      marginRight: 0,
    },
  },
  Icon: {
    fontSize: 20,
    padding: 5,
    marginLeft: 10,
  },
  emailInput: {
    flex: '2 1 200px',
  },
  urlInput: {
    flex: '1 1 150px',
  },
}))
