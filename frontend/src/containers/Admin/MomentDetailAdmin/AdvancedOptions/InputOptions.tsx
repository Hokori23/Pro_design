import React, { FC } from 'react'
import { FormControl } from '@material-ui/core'
import { Input } from '@/components/Input'
import { Post } from '@/utils/Request/Post'
import { cloneDeep } from 'lodash-es'
import { Action } from '@rematch/core'

interface InputOptionsProps {
  className?: string
  moment: Post
  onChange: ((payload: Post) => Action<Post, void>) & {
    isEffect: false
  }
}
export const InputOptions: FC<InputOptionsProps> = ({
  className,
  moment,
  onChange,
}) => {
  return (
    <FormControl
      className={className}
      component="fieldset"
      style={{ width: '100%' }}
    >
      <Input
        InputLabelProps={{ shrink: true }}
        fullWidth
        label="说说优先级(数字越大，查询优先级越大)"
        multiline
        onChange={(e) => {
          const priority = Number(e.target.value)
          onChange({
            ...cloneDeep(moment),
            priority: Number.isNaN(priority) ? 0 : priority,
          })
        }}
        value={String(moment.priority)}
      />
    </FormControl>
  )
}

export default InputOptions
