import { createModel } from '@rematch/core'
import { SimpleConfirmDialogProps } from '@/components/SimpleConfirmDialog'
import { RootModel } from '@/models'
import { PostCommentWithAuthorPost } from '@/utils/Request/PostComment'
import _ from 'lodash'
import { PostComment } from '@/utils/Request'

interface PostCommentAdminState {
  deleteComment?: PostCommentWithAuthorPost
  deleting: boolean
  deleteDialog: SimpleConfirmDialogProps
}

export const defaultPostCommentAdminState: PostCommentAdminState = {
  deleting: false,
  deleteDialog: {
    open: false,
    handleClose: () => {},
  },
}

export const postCommentAdmin = createModel<RootModel>()({
  state: _.cloneDeep(defaultPostCommentAdminState),
  reducers: {
    SET_DELETING: (state: PostCommentAdminState, newDeleting: boolean) => {
      state.deleting = newDeleting
      return state
    },
    SET_DELETE_COMMENT: (
      state: PostCommentAdminState,
      newComment: PostCommentWithAuthorPost,
    ) => {
      state.deleteComment = newComment
      return state
    },
    SET_DELETE_DIALOG: (
      state: PostCommentAdminState,
      newDeleteDialog: SimpleConfirmDialogProps,
    ) => {
      state.deleteDialog = newDeleteDialog
      return state
    },
  },
  effects: (dispatch) => {
    const { postCommentAdmin, common } = dispatch

    return {
      // 异步请求 demo
      async DeletePostComment(id: number): Promise<void> {
        postCommentAdmin.SET_DELETING(true)
        const res = await PostComment.Delete(id)
        postCommentAdmin.SET_DELETING(false)
        if (res?.code === 0) {
          common.SET_AXIOS_SNACK_BAR({
            open: true,
            message: res?.message,
          })
        }
      },
    }
  },
})
