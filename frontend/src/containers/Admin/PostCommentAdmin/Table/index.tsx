import React, { FC } from 'react'
import { DataGrid, PageChangeParams } from '@material-ui/data-grid'

// hooks
import useTable from './useTable'
import { PostCommentWithAuthor } from '@/utils/Request/PostComment'

interface TableProps {
  rows: PostCommentWithAuthor[]
  pageSize: number
  rowCount: number
  loading: boolean
  onPageChange: (params: PageChangeParams) => void
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
