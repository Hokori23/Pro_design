import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { Request } from '@/utils'
import {
  EditedPost,
  Post,
  PostType,
  PostWithAuthor,
  Toggle,
} from '@/utils/Request/Post'
import { PostTag } from '@/utils/Request/PostTag'
import _ from 'lodash'
import { CodeDictionary } from '@/utils/Request/type'

export interface PostTagWithCheck extends PostTag {
  checked: boolean
}
export interface MomentDetailAdminState {
  loadingMoment: boolean
  deletingMoment: boolean
  moment: Post
  isNew: boolean // 标志编辑或新建Moment
  backdropLoading: boolean
}

export const defaultMoment: Post = {
  uid: 0,
  title: '',
  coverUrl: '',
  content: '',
  type: PostType.MOMENT,
  isDraft: Toggle.N,
  isHidden: Toggle.N,
  isLocked: Toggle.N,
  priority: 0,
  likesCount: 0,
  dislikesCount: 0,
  pageViews: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const defaultMomentDetailAdminState: MomentDetailAdminState = {
  moment: _.cloneDeep(defaultMoment),
  loadingMoment: true,
  deletingMoment: false,
  isNew: true,
  backdropLoading: false,
}

export const momentDetailAdmin = createModel<RootModel>()({
  state: _.cloneDeep(defaultMomentDetailAdminState),
  reducers: {
    // 直接修改 state
    SET_MOMENT: (state: MomentDetailAdminState, newMoment: Post) => {
      state.moment = newMoment
      return state
    },
    SET_LOADING_MOMENT: (
      state: MomentDetailAdminState,
      newLoading: boolean,
    ) => {
      state.loadingMoment = newLoading
      return state
    },
    SET_DELETING_MOMENT: (
      state: MomentDetailAdminState,
      newLoading: boolean,
    ) => {
      state.deletingMoment = newLoading
      return state
    },
    SET_IS_NEW: (state: MomentDetailAdminState, status: boolean) => {
      state.isNew = status
      return state
    },
    SET_BACKDROP_LOADING: (state: MomentDetailAdminState, status: boolean) => {
      state.backdropLoading = status
      return state
    },
  },
  effects: (dispatch) => {
    const { momentDetailAdmin } = dispatch
    return {
      // 异步请求 demo
      async RetrieveMoment(id: string): Promise<PostWithAuthor | undefined> {
        momentDetailAdmin.SET_MOMENT(
          _.cloneDeep(defaultMomentDetailAdminState.moment),
        )
        momentDetailAdmin.SET_LOADING_MOMENT(true)
        const res = await Request.Post.Retrieve__Admin(Number(id))
        if (res?.data) {
          momentDetailAdmin.SET_MOMENT(res.data)
        }
        momentDetailAdmin.SET_LOADING_MOMENT(false)
        return res?.data
      },
      async DeleteMoment(id: number): Promise<CodeDictionary | undefined> {
        momentDetailAdmin.SET_DELETING_MOMENT(true)
        // 先粗暴地使用超级管理员权限
        const res = await Request.Post.Delete__Admin(id)
        momentDetailAdmin.SET_DELETING_MOMENT(false)
        if (res) {
          dispatch.common.SET_AXIOS_SNACK_BAR({
            message: res?.message,
            open: true,
          })
        }
        return res?.code
      },
      async CreateMoment(payload, state): Promise<void> {
        momentDetailAdmin.SET_BACKDROP_LOADING(true)
        const res = await Request.Post.Create({
          post: (state.momentDetailAdmin.moment as unknown) as EditedPost,
          tids: [],
        })
        momentDetailAdmin.SET_BACKDROP_LOADING(false)
        if (res) {
          dispatch.common.SET_AXIOS_SNACK_BAR({
            message: res?.message,
            open: true,
          })
          res?.data && momentDetailAdmin.SET_MOMENT(res?.data)
        }
      },
      async EditMoment(payload, state): Promise<void> {
        momentDetailAdmin.SET_BACKDROP_LOADING(true)
        const res = await Request.Post.Edit({
          post: (state.momentDetailAdmin.moment as unknown) as EditedPost,
          tids: [],
        })
        momentDetailAdmin.SET_BACKDROP_LOADING(false)
        if (res) {
          dispatch.common.SET_AXIOS_SNACK_BAR({
            message: res?.message,
            open: true,
          })
          res?.data && momentDetailAdmin.SET_MOMENT(res?.data)
        }
      },
    }
  },
})
