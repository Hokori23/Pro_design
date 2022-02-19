import React, { FC } from 'react'
import { FormControl } from '@material-ui/core'
import { Input } from '@/components/Input'
import { PostWithTags } from '@/utils/Request/Post'
import { cloneDeep } from 'lodash-es'
import { Action } from '@rematch/core'

interface InputOptionsProps {
  className?: string
  post: PostWithTags
  onChange: ((payload: PostWithTags) => Action<PostWithTags, void>) & {
    isEffect: false
  }
}
export const InputOptions: FC<InputOptionsProps> = ({
  className,
  post,
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
        label="文章优先级(数字越大，查询优先级越大)"
        multiline
        onChange={(e) => {
          const priority = Number(e.target.value)
          onChange({
            ...cloneDeep(post),
            priority: Number.isNaN(priority) ? 0 : priority,
          })
        }}
        value={String(post.priority)}
      />
    </FormControl>
  )
}

export default InputOptions
