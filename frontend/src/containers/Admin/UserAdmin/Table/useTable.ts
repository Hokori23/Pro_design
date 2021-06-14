import { ColDef } from '@material-ui/data-grid'
import { UserName, Email, createdAt } from './Title'

export default () => {
  const columns: ColDef[] = [
    {
      field: 'userName',
      headerName: '用户名',
      headerAlign: 'left',
      flex: 1,
      renderCell: UserName,
    },
    {
      field: 'email',
      headerName: '邮箱',
      headerAlign: 'left',
      flex: 1,
      renderCell: Email,
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
