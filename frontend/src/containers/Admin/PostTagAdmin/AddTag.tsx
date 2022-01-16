import React, { FC } from 'react'
import { Fab, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface AddTagProps {
  className?: string
  style?: React.CSSProperties
  isMobileSize: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
const AddTag: FC<AddTagProps> = ({
  className,
  style,
  isMobileSize,
  onClick,
}) => {
  return (
    <Tooltip
      aria-label="add"
      disableFocusListener
      disableTouchListener
      placement="left"
      title="添加标签"
    >
      <Fab
        className={className}
        color="primary"
        onClick={onClick}
        size={isMobileSize ? 'small' : 'medium'}
        style={style}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  )
}

export default AddTag
