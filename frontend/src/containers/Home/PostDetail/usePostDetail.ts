import { Request } from '@/utils'
import { PostWithAuthor } from '@/utils/Request/Post'
import { isDef } from '@/utils/tools'
import { useEffect, useState } from 'react'
import { useActivate } from 'react-activation'
import * as H from 'history'

export default (location: H.Location<unknown>, id: string) => {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState((null as any) as PostWithAuthor)

  const Retrieve = async (id: string) => {
    setLoading(true)
    const res = await Request.Post.Retrieve(Number(id))
    if (isDef(res) && res.code === 0 && isDef(res.data)) {
      setPost(res.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    // 初始化
    void Retrieve(id)
  }, [])

  useActivate(() => {
    // 更新
    void Retrieve(id)
  })
  return {
    loading,
    post,
  }
}
