import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  markdown: {
    '& > pre': {
      padding: 0,
      backgroundColor: 'inherit',
    },
    '& code': { backgroundColor: 'inherit' },
    '& img': { maxWidth: '100%' },
    '& h6': { color: theme.palette.text.disabled },
    '& h7': { color: theme.palette.text.disabled },
    '& h8': { color: theme.palette.text.disabled },
    '& h9': { color: theme.palette.text.disabled },
  },
}))
