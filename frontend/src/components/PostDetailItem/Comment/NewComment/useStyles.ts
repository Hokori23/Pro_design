import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
export default makeStyles((theme) => ({
  commentBox: {
    backgroundColor: grey[200],
    borderRadius: 5,
    padding: '1rem',
    marginBottom: '1rem',
  },
  commentForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  commentForm__isLogin: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  commentLoginUser: {
    alignSelf: 'flex-start',
    marginRight: 22,
    '& .MuiAvatar-root': {
      width: 48,
      height: 48,
      padding: 0,
      marginBottom: 5,
    },
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
  commentInput: {
    flexGrow: 1,
  },
  emailInput: {
    flex: '2 1 200px',
  },
  urlInput: {
    flex: '1 1 150px',
  },
}))
