import React, { FC } from 'react'
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from '@mui/material'
import { PostWithTags, Toggle } from '@/utils/Request/Post'
import { cloneDeep } from 'lodash-es'
import { Action } from '@rematch/core'

interface CheckOptionsProps {
  className?: string
  post: PostWithTags
  onChange: ((payload: PostWithTags) => Action<PostWithTags, void>) & {
    isEffect: false
  }
}
export const CheckOptions: FC<CheckOptionsProps> = ({
  className,
  post,
  onChange,
}) => {
  const checkOptionsKeys: Array<{
    key: keyof PostWithTags
    label: string
  }> = [
    {
      key: 'isHidden',
      label: '隐藏',
    },
    {
      key: 'isLocked',
      label: '封锁评论区',
    },
  ]
  return (
    <FormControl component="fieldset" style={{ width: '100%' }}>
      <FormLabel component="legend">更多设置</FormLabel>
      <FormGroup className={className} row style={{ position: 'relative' }}>
        {checkOptionsKeys.map(({ key, label }) => (
          <FormControlLabel
            control={
              <Switch
                checked={!!post[key]}
                color="primary"
                name={key}
                onChange={({ target: { name, checked } }) => {
                  onChange({
                    ...cloneDeep(post),
                    [name]: Number(checked) as Toggle,
                  })
                }}
              />
            }
            key={key}
            label={label}
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}

export default CheckOptions
