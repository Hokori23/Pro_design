import React, { FC } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { PostType, PostWithTags } from '@/utils/Request/Post'
import { cloneDeep } from 'lodash-es'
import { Action } from '@rematch/core'

interface SelectOptionsProps {
  className?: string
  post: PostWithTags
  onChange: ((payload: PostWithTags) => Action<PostWithTags, void>) & {
    isEffect: false
  }
}
export const SelectOptions: FC<SelectOptionsProps> = ({
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
      <InputLabel>文章类型</InputLabel>
      <Select
        onChange={(e) => {
          onChange({ ...cloneDeep(post), type: e.target.value as PostType })
        }}
        value={post.type}
      >
        <MenuItem value={PostType.POST}>帖子</MenuItem>
        <MenuItem value={PostType.LANDSCAPE}>沉浸式背景</MenuItem>
        <MenuItem value={PostType.PAGE}>自定义页面</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SelectOptions
