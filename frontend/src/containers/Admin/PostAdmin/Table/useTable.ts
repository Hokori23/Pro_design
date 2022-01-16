import { User } from '@/utils/Request/User'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GridColumns } from '@mui/x-data-grid'
import moment from 'moment'
import { Title, Tags } from './Title'

export default () => {
  const theme = useTheme()

  /**
   * // TODO
   * isMobileSize如果发生变化，会导致BUG:
   * Uncaught Error: Rendered more hooks than during the previous render.
   * 原因: hide和renderCell一起使用时，renderCell使用了hooks导致的
   */
  const isMobileSize = useMediaQuery(theme.breakpoints.down('md'))

  const columns: GridColumns = [
    {
      field: 'title',
      headerName: '标题',
      headerAlign: 'center',
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
      field: 'tags',
      headerName: '标签',
      headerAlign: 'center',
      flex: 1,
      renderCell: Tags,
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
