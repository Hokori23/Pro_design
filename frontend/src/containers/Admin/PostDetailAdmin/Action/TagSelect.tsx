import React, { FC } from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@material-ui/core'
import { PostTagWithCheck } from '@/containers/Admin/PostDetailAdmin/model'
import { CircularLoading } from '@/components/CircularLoading'

interface TagSelectProps {
  className?: string
  options: PostTagWithCheck[]
  loading: boolean
  onChange: (checked: boolean, idx: number) => void
}
export const TagSelect: FC<TagSelectProps> = ({
  className,
  options,
  loading,
  onChange,
}) => {
  return (
    <FormControl component="fieldset" style={{ width: '100%' }}>
      <FormLabel component="legend">标签</FormLabel>
      <FormGroup className={className} row style={{ position: 'relative' }}>
        {loading ? (
          <CircularLoading size={20} />
        ) : (
          options.map((tag, idx) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={tag.checked}
                  color="primary"
                  name={tag.name}
                  onChange={(e, checked) => {
                    onChange(checked, idx)
                  }}
                />
              }
              key={tag.id}
              label={tag.name}
            />
          ))
        )}
      </FormGroup>
    </FormControl>
  )
}

export default TagSelect
