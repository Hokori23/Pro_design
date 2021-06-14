import { useState } from 'react'
import { FormattedPostComment } from '@/utils/Request/PostComment'
import Request from '@/utils/Request'
import { isDef, scrollTo } from '@/utils/tools'
import { useSelector } from 'react-redux'
import { RootState, store } from '@/store'
import { Group } from '@/utils/Request/User'

export default (comment: FormattedPostComment) => {
  const state = useSelector((state: RootState) => state.postDetail)
  const commonState = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.postDetail)
  const commonDispatch = useSelector(() => store.dispatch.common)

  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [displayReplyBox, setDisplayReplyBox] = useState(false)
  const [replyParent, setReplyParent] = useState<
    FormattedPostComment | undefined
  >(undefined)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const handleDialogClose = () => {
    setDeleteDialog(false)
  }
  const handleDeleteComment = async () => {
    dispatch.SET_LOADING_COMMENT(true)
    const res = await Request.PostComment.Delete(comment.id)
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
    deleteDialog,
    deleting: state.loadingComment,
    isAdmin: (commonState.userInfo?.group || 0) > Group.SUBSCRIBER,
    handleDialogClose,
    handleDeleteComment,
    setDeleteDialog,
    setDisplayReplyBox,
    Like,
    Dislike,
    handleDisplayReplyBox,
  }
}
