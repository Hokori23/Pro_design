import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { Request } from '@/utils'
import { Post, PostType, PostWithAuthor, Toggle } from '@/utils/Request/Post'
import { PostTag } from '@/utils/Request/PostTag'
import _ from 'lodash'

export interface PostTagWithCheck extends PostTag {
  checked: boolean
}
export interface PostDetailAdminState {
  loadingPost: boolean
  deletingPost: boolean
  loadingTags: boolean
  post: Post
  tags: PostTagWithCheck[]
  isNew: boolean // 标志编辑或新建Post
  uploadingImg: boolean
}

export const defaultPostDetailAdminState: PostDetailAdminState = {
  post: {
    uid: 0,
    title: '',
    coverUrl: '',
    content: '',
    type: PostType.POST,
    isDraft: Toggle.N,
    isHidden: Toggle.N,
    isLocked: Toggle.N,
    priority: 0,
    likesCount: 0,
    dislikesCount: 0,
    pageViews: 0,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  loadingPost: true,
  deletingPost: false,
  tags: [],
  loadingTags: true,
  isNew: true,
  uploadingImg: false,
}

export const postDetailAdmin = createModel<RootModel>()({
  state: _.cloneDeep(defaultPostDetailAdminState),
  reducers: {
    // 直接修改 state
    SET_POST: (state: PostDetailAdminState, newPost: Post) => {
      state.post = newPost
      return state
    },
    SET_LOADING_POST: (state: PostDetailAdminState, newLoading: boolean) => {
      state.loadingPost = newLoading
      return state
    },
    SET_DELETING_POST: (state: PostDetailAdminState, newLoading: boolean) => {
      state.deletingPost = newLoading
      return state
    },
    _SET_TAGS: (state: PostDetailAdminState, newTags: PostTagWithCheck[]) => {
      // 不做格式化处理
      state.tags = newTags
      return state
    },
    SET_TAGS: (state: PostDetailAdminState, newTags: PostTag[]) => {
      state.tags = newTags.map((tag) => {
        ;(tag as PostTagWithCheck).checked = !!state.post?.tags.find(
          (_tag) => _tag.id === tag.id,
        )
        return tag as PostTagWithCheck
      })
      return state
    },
    SET_LOADING_TAGS: (state: PostDetailAdminState, newLoading: boolean) => {
      state.loadingTags = newLoading
      return state
    },
    SET_IS_NEW: (state: PostDetailAdminState, status: boolean) => {
      state.isNew = status
      return state
    },
    SET_UPLOADING_IMG: (state: PostDetailAdminState, status: boolean) => {
      state.uploadingImg = status
      return state
    },
  },
  effects: (dispatch) => {
    const { postDetailAdmin, common } = dispatch
    return {
      // 异步请求 demo
      async RetrievePost(id: string): Promise<PostWithAuthor | undefined> {
        postDetailAdmin.SET_POST(_.cloneDeep(defaultPostDetailAdminState.post))
        postDetailAdmin.SET_LOADING_POST(true)
        const res = await Request.Post.Retrieve(Number(id))
        if (res?.data) {
          postDetailAdmin.SET_POST(res.data)
        }
        postDetailAdmin.SET_LOADING_POST(false)
        return res?.data
      },
      async DeletePost(id: number): Promise<void> {
        postDetailAdmin.SET_DELETING_POST(true)
        // 先粗暴地使用超级管理员权限
        const res = await Request.Post.Delete__Admin(id)
        postDetailAdmin.SET_LOADING_POST(false)
        if (res?.code === 0) {
          common.SET_AXIOS_SNACK_BAR({
            message: res?.message,
            open: true,
          })
        }
      },
      async RetrieveTagAll() {
        postDetailAdmin.SET_LOADING_TAGS(true)
        const res = await Request.PostTag.RetrieveAll()
        postDetailAdmin.SET_LOADING_TAGS(false)
        if (res?.data) {
          postDetailAdmin.SET_TAGS(res?.data)
        }
      },
    }
  },
})
