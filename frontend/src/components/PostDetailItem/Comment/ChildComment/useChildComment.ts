import { useEffect, useState } from 'react'
import Request from '@/utils/Request'
import { FormattedPostComment } from '@/utils/Request/PostComment'
import _ from 'lodash'

interface PostCommentWithStatus extends FormattedPostComment {
  liked: boolean
  disliked: boolean
}

export default (rootComment: FormattedPostComment) => {
  const rawChildComments = (rootComment.children as PostCommentWithStatus[])!.map(
    (comment) => {
      comment.liked = comment.disliked = false
      return comment
    },
  )
  const [childComments, setChildComments] = useState(rawChildComments)

  const Like = async (comment: PostCommentWithStatus, idx: number) => {
    const res = await Request.PostComment.Like(comment.id)
    if (res?.code === 0) {
      const cloneChildComments = _.cloneDeep(childComments)
      cloneChildComments[idx].likesCount++
      cloneChildComments[idx].liked = true
      setChildComments(cloneChildComments)
    }
  }
  const Dislike = async (comment: PostCommentWithStatus, idx: number) => {
    const res = await Request.PostComment.Dislike(comment.id)
    if (res?.code === 0) {
      const cloneChildComments = _.cloneDeep(childComments)
      cloneChildComments[idx].dislikesCount++
      cloneChildComments[idx].disliked = true
      setChildComments(cloneChildComments)
    }
  }
  useEffect(() => {
    const rawChildComments = (rootComment.children as PostCommentWithStatus[])!.map(
      (comment) => {
        comment.liked = comment.disliked = false
        return comment
      },
    )
    setChildComments(rawChildComments)
  }, [rootComment])

  return {
    childComments,
    Like,
    Dislike,
  }
}
