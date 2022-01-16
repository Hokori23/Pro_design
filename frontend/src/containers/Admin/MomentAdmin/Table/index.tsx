import React, { FC } from 'react'
import { DataGrid } from '@mui/x-data-grid'

// hooks
import useTable from './useTable'
import { PostWithAuthor } from '@/utils/Request/Post'

interface TableProps {
  rows: PostWithAuthor[]
  pageSize: number
  rowCount: number
  loading: boolean
  onPageChange: (newPage: number) => void
}
const Table: FC<TableProps> = ({
  rows,
  pageSize,
  rowCount,
  loading,
  onPageChange,
}) => {
  const { columns } = useTable()
  return (
    <DataGrid
      columns={columns}
      loading={loading}
      onPageChange={onPageChange}
      pageSize={pageSize}
      pagination
      paginationMode="server"
      rowCount={rowCount}
      rows={rows}
    />
  )
}
export default Table
