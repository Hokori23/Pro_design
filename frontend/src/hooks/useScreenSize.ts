import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

export const useMobileSize = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('md'))
}
export const useDeskTopSize = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up('sm'))
}
