import { useEffect, useState } from 'react'
import Request from '@/utils/Request'
import { FormattedPostComment } from '@/utils/Request/PostComment'
import { cloneDeep } from 'lodash-es'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'
import { Group } from '@/utils/Request/User'

interface PostCommentWithStatus extends FormattedPostComment {
  liked: boolean
  disliked: boolean
}

export default (rootComment: FormattedPostComment) => {
  const state = useSelector((state: RootState) => state.postDetail)
  const commonState = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.postDetail)
  const commonDispatch = useSelector(() => store.dispatch.common)
  const rawChildComments = (rootComment.children as PostCommentWithStatus[])!.map(
    (comment) => {
      comment.liked = comment.disliked = false
      return comment
    },
  )
  const [childComments, setChildComments] = useState(rawChildComments)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [deleteComment, setDeleteComment] = useState(
    (null as unknown) as PostCommentWithStatus,
  )

  const handleDialogClose = () => {
    setDeleteDialog(false)
  }
  const handleDialogOpen = (comment: PostCommentWithStatus) => {
    setDeleteComment(comment)
    setDeleteDialog(true)
  }

  const handleDeleteComment = async () => {
    dispatch.SET_LOADING_COMMENT(true)
    const res = await Request.PostComment.Delete(deleteComment.id)
    dispatch.SET_LOADING_COMMENT(false)
    if (res?.code === 0) {
      void (await dispatch.RetrievePost(String(state.post!.id)))
      commonDispatch.SET_AXIOS_SNACK_BAR({
        message: res?.message,
        open: true,
      })
      handleDialogClose()
    } else {
      commonDispatch.SET_AXIOS_SNACK_BAR({
        message: res?.message,
        type: 'error',
        open: true,
      })
    }
  }

  const Like = async (comment: PostCommentWithStatus, idx: number) => {
    const res = await Request.PostComment.Like(comment.id)
    if (res?.code === 0) {
      const cloneChildComments = cloneDeep(childComments)
      cloneChildComments[idx].likesCount++
      cloneChildComments[idx].liked = true
      setChildComments(cloneChildComments)
    }
  }

  const Dislike = async (comment: PostCommentWithStatus, idx: number) => {
    const res = await Request.PostComment.Dislike(comment.id)
    if (res?.code === 0) {
      const cloneChildComments = cloneDeep(childComments)
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
    deleteDialog,
    deleteComment,
    deleting: state.loadingComment,
    isAdmin: (commonState.userInfo?.group || 0) > Group.SUBSCRIBER,
    handleDialogClose,
    handleDialogOpen,
    handleDeleteComment,
    Like,
    Dislike,
  }
}
