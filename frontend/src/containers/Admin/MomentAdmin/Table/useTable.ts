import { User } from '@/utils/Request/User'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GridColumns } from '@mui/x-data-grid'
import moment from 'moment'
import { Title } from './Title'

export default () => {
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('md'))

  const columns: GridColumns = [
    {
      field: 'content',
      headerName: '内容',
      headerAlign: 'left',
      flex: isMobileSize ? 2 : 3,
      renderCell: Title,
    },
    {
      field: 'author',
      headerName: '作者',
      headerAlign: 'center',
      flex: 1,
      hide: isMobileSize,
      valueFormatter: ({ value }) => (value as User)?.userName,
    },
    {
      field: 'createdAt',
      headerName: '日期',
      headerAlign: 'center',
      flex: 1,
      valueFormatter: ({ value }) => moment(value as Date).calendar(),
    },
  ]

  return { columns }
}
