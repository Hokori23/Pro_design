import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    paddingBottom: '0.5rem',
    height: '100%',
  },
  posts: {
    width: '100%',
    flexGrow: 1,
    [theme.breakpoints.up(700)]: {
      maxWidth: 1024,
      alignSelf: 'center',
    },
  },
  footer: {
    marginTop: '1rem',
  },
}))
