import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) => ({
  markdown: {
    '& h6': { color: theme.palette.text.disabled },
    '& h7': { color: theme.palette.text.disabled },
    '& h8': { color: theme.palette.text.disabled },
    '& h9': { color: theme.palette.text.disabled },
  },
}))
