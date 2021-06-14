import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    height: '100%',
  },
  user: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up(700)]: {
      width: 700,
      alignSelf: 'center',
    },
    flexGrow: 1,
  },
  userItem: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  AvatarWrapper: {
    position: 'relative',
    minWidth: 40,
    marginRight: 16,
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
  TextAreaWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 24,
    flex: '1 1 120px',
  },
  TextAreaInner: {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
  },
  avatarInput: {
    display: 'none',
  },
}))
