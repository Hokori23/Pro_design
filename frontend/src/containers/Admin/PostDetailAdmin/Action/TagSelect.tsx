import React, { FC } from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
} from '@material-ui/core'
import { PostTagWithCheck } from '@/containers/Admin/PostDetailAdmin/model'
import { CircularLoading } from '@/components/CircularLoading'
import InnerLink from '@/components/InnerLink'
import { PathName } from '@/routes'
import classnames from 'classnames'

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
      <FormGroup
        className={classnames(
          options.length ? '' : 'flex flex-center',
          className,
        )}
        row
        style={{ position: 'relative' }}
      >
        {loading ? (
          <CircularLoading size={20} />
        ) : options.length ? (
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
        ) : (
          <Typography align="center" color="primary" variant="h6">
            查无标签，
            <InnerLink to={PathName.POST_TAG_ADMIN}>前往创建</InnerLink>
          </Typography>
        )}
      </FormGroup>
    </FormControl>
  )
}

export default TagSelect
