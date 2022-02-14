import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './store'
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from 'notistack'
import { indigo, grey } from '@mui/material/colors'
import { autoFixContext } from 'react-activation'
import { isDev } from './utils/const'
import '@/static/index.less'
import 'fontsource-roboto'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

autoFixContext([require('react/jsx-runtime'), 'jsx', 'jsxs', 'jsxDEV'])
isDev &&
  autoFixContext([require('react/jsx-dev-runtime'), 'jsx', 'jsxs', 'jsxDEV'])

export const theme = createTheme({
  palette: {
    mode: 'light',
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
      // hint: indigo[400],
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
