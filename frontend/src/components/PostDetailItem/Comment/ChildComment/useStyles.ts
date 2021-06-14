import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  childComment: {
    display: 'flex',
    paddingTop: 5,
    paddingLeft: 10,
    marginBottom: 5,
  },
  childCommentSelected: {
    backgroundColor: theme.palette.error.light,
  },
  childCommentBox: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    '& > div': {
      display: 'flex',
    },
  },
  childCommentAvatar: {
    '& .MuiAvatar-root': {
      width: 24,
      height: 24,
    },
    width: 24,
    height: 24,
    padding: 0,
    marginRight: 11,
  },
  childCommentAuthorName: {
    fontWeight: 600,
    textTransform: 'inherit',
    letterSpacing: '0.08333em',
    marginRight: 8,
  },
  childCommentText: {
    wordBreak: 'break-word',
  },
  childCommentReply: {
    display: 'inline-block',
    marginRight: 5,
  },
  childCommentFooter: {
    display: 'flex',
    alignItems: 'center',
  },
  childCommentAction: {
    display: 'flex',
    justifySelf: 'flex-end',
    marginLeft: 10,
    '& .MuiButtonBase-root.MuiIconButton-root': {
      padding: 3,
    },
  },
  childCommentActionItem: {
    marginRight: 10,
  },
  Icon: {
    fontSize: 18,
  },
  button: {
    marginLeft: 5,
    minWidth: 40,
    [theme.breakpoints.up(700)]: {
      minWidth: 50,
    },
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
}))
