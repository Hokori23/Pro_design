import React, { FC } from 'react'
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from '@mui/material'
import { Post, Toggle } from '@/utils/Request/Post'
import { cloneDeep } from 'lodash-es'
import { Action } from '@rematch/core'

interface CheckOptionsProps {
  className?: string
  moment: Post
  onChange: ((payload: Post) => Action<Post, void>) & {
    isEffect: false
  }
}
export const CheckOptions: FC<CheckOptionsProps> = ({
  className,
  moment,
  onChange,
}) => {
  const checkOptionsKeys: Array<{
    key: keyof Post
    label: string
  }> = [
    {
      key: 'isHidden',
      label: '隐藏',
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
                checked={!!moment[key]}
                color="primary"
                name={key}
                onChange={({ target: { name, checked } }) => {
                  onChange({
                    ...cloneDeep(moment),
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
