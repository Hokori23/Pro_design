import React, { FC } from 'react'
import { DataGrid } from '@mui/x-data-grid'

// hooks
import useTable from './useTable'
import { User } from '@/utils/Request/User'

interface TableProps {
  rows: User[]
  pageSize: number
  rowCount: number
  loading: boolean
  rowsPerPageOptions?: number[]
  onPageSizeChange: (newPageSize: number) => void
}
const Table: FC<TableProps> = ({
  rows,
  pageSize,
  rowCount,
  loading,
  rowsPerPageOptions,
  onPageSizeChange,
}) => {
  const { columns } = useTable()
  return (
    <DataGrid
      columns={columns}
      loading={loading}
      // onPageSizeChange={onPageSizeChange}
      pageSize={pageSize}
      pagination
      rowCount={rowCount}
      rows={rows}
      // rowsPerPageOptions={rowsPerPageOptions}
    />
  )
}
export default Table
