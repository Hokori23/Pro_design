import { User } from '@/utils/Request/User'
import { GridColumns } from '@mui/x-data-grid'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { useMobileSize } from '@/hooks/useScreenSize'
import { Title } from './Title'

export default () => {
  const isMobileSize = useMobileSize()

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
      valueFormatter: ({ value }) =>
        formatDistanceToNow(new Date(value as string), {
          locale: zhCN,
          addSuffix: true,
        }),
    },
  ]

  return { columns }
}
