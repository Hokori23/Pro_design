import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack'
import { indigo, grey } from '@material-ui/core/colors'

import '@/static/index.less'
import 'fontsource-roboto'

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: indigo.A200,
    },
    text: {
      primary: '#000',
      secondary: grey[600],
      disabled: grey[400],
      hint: indigo[400],
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
