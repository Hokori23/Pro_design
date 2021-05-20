import { Request } from '@/utils'
import { PostType, Toggle, Post } from '@/utils/Request/Post'
import { isDef } from '@/utils/tools'
import { useEffect, useState } from 'react'

const POST_CAPACITY = 10

export default () => {
  const [page, setPage] = useState(1)
  const [capacity, setCapacity] = useState(POST_CAPACITY)
  const [total, setTotal] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [isASC, setIsASC] = useState(Toggle.N)
  const [postTypes, setPostTypes] = useState([] as PostType[])
  const [posts, setPosts] = useState([] as Post[])

  const RetrieveAll = async (
    page: number,
    capacity: number,
    isASC: Toggle,
    postTypes: PostType[],
  ) => {
    setPage(page)
    setCapacity(capacity)
    setIsASC(isASC)
    setPostTypes(postTypes)
    const res = await Request.Post.RetrieveAll(page, capacity, isASC, postTypes)
    if (isDef(res) && res.code === 0 && isDef(res.data)) {
      const data = res.data
      setTotal(data.total)
      setMaxPage(Math.ceil(total / capacity))
      setPosts(res.data.posts)
    }
  }
  useEffect(() => {
    void RetrieveAll(page, capacity, isASC, postTypes)
  }, [])
  return {
    page,
    capacity,
    total,
    maxPage,
    isASC,
    postTypes,
    posts,
    RetrieveAll,
  }
}
