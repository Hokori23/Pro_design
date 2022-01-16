import { Group, GroupCN } from '@/utils/Request/User'
import { GridColumns } from '@mui/x-data-grid'
import { UserName, Email, createdAt } from './Title'

export default () => {
  const columns: GridColumns = [
    {
      field: 'userName',
      headerName: '用户名',
      headerAlign: 'left',
      flex: 1.5,
      renderCell: UserName,
    },
    {
      field: 'email',
      headerName: '邮箱',
      headerAlign: 'center',
      flex: 1,
      renderCell: Email,
    },
    {
      field: 'group',
      headerName: '权限',
      headerAlign: 'center',
      flex: 1,
      align: 'center',
      valueFormatter: (params) => {
        const value = Number(params.value)
        if (value === Group.SUBSCRIBER) return GroupCN.SUBSCRIBER
        if (value === Group.ADMIN) return GroupCN.ADMIN
        if (value === Group.SUPER_ADMIN) return GroupCN.SUPER_ADMIN
      },
    },
    {
      field: 'createdAt',
      headerName: '日期',
      headerAlign: 'center',
      flex: 1,
      renderCell: createdAt,
    },
  ]

  return { columns }
}
