import { useState } from 'react'
import { FormattedPostComment } from '@/utils/Request/PostComment'
import Request from '@/utils/Request'
import { isDef, scrollTo } from '@/utils/tools'

export default (comment: FormattedPostComment) => {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [displayReplyBox, setDisplayReplyBox] = useState(false)
  const [replyParent, setReplyParent] = useState<
    FormattedPostComment | undefined
  >(undefined)
  const Like = async () => {
    const res = await Request.PostComment.Like(comment.id)
    if (res?.code === 0) {
      comment.likesCount++
      setLiked(true)
    }
  }
  const Dislike = async () => {
    const res = await Request.PostComment.Dislike(comment.id)
    if (res?.code === 0) {
      comment.dislikesCount++
      setDisliked(true)
    }
  }
  const handleDisplayReplyBox = (parent?: FormattedPostComment) => {
    if (isDef(parent)) {
      setReplyParent(parent)
    } else {
      setReplyParent(undefined)
    }
    setDisplayReplyBox(true)
    setTimeout(() => scrollTo(`#replyComment-${comment.id}`, 'end'))
  }
  return {
    liked,
    disliked,
    displayReplyBox,
    replyParent,
    setDisplayReplyBox,
    Like,
    Dislike,
    handleDisplayReplyBox,
  }
}
