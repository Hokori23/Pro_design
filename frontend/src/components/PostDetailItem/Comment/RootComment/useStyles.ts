import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  rootComment: {
    display: 'flex',
    borderBottom: '1px solid #e7e7e7',
    padding: '0 1rem',
    marginBottom: '1rem',
  },
  rootCommentAvatar: {
    '& .MuiAvatar-root': {
      width: 48,
      height: 48,
    },
    width: 48,
    height: 48,
    padding: 0,
    marginRight: 22,
  },
  rootCommentBox: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  rootCommentAuthorName: {
    fontWeight: 600,
    textTransform: 'inherit',
    letterSpacing: '0.08333em',
  },
  rootCommentText: {
    wordBreak: 'break-word',
  },
  rootCommentFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rootCommentAction: {
    display: 'flex',
    justifySelf: 'flex-end',
    '& .MuiButtonBase-root.MuiIconButton-root': {
      padding: 5,
    },
  },
  rootCommentActionItem: {
    marginRight: 10,
  },
  Icon: {
    fontSize: 20,
  },
  replyButton: {
    marginLeft: 5,
    minWidth: 40,
    [theme.breakpoints.up(700)]: {
      minWidth: 50,
    },
  },
}))
