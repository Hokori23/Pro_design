import { User } from '@/utils/Request/User'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { ColDef, ValueFormatterParams } from '@material-ui/data-grid'
import moment from 'moment'
import { Title } from './Title'

export default () => {
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))

  const columns: ColDef[] = [
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
      valueFormatter: (params: ValueFormatterParams) =>
        (params.row.author as User).userName,
    },
    {
      field: 'createdAt',
      headerName: '日期',
      headerAlign: 'center',
      flex: 1,
      valueFormatter: (params: ValueFormatterParams) =>
        moment(params.row.createdAt as Date).calendar(),
    },
  ]

  return { columns }
}
