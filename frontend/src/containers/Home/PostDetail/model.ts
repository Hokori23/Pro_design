import { createModel } from '@rematch/core'
import { RootModel } from '@/models'
import { Request } from '@/utils'
import { PostWithAuthor } from '@/utils/Request/Post'
export interface PostDetailState {
  loadingPost: boolean
  post: PostWithAuthor
}

export const defaultPostDetailState: PostDetailState = {
  loadingPost: true,
  post: (null as any) as PostWithAuthor,
}

export const postDetail = createModel<RootModel>()({
  state: defaultPostDetailState,
  reducers: {
    // 直接修改 state
    SET_POST: (state: PostDetailState, newPost: PostWithAuthor) => {
      state.post = newPost
      return state
    },
    SET_LOADING_POST: (state: PostDetailState, newLoading: boolean) => {
      state.loadingPost = newLoading
      return state
    },
  },
  effects: (dispatch) => {
    const { postDetail } = dispatch
    return {
      // 异步请求 demo
      async RetrievePost(id: string): Promise<void> {
        postDetail.SET_LOADING_POST(true)
        const res = await Request.Post.Retrieve(Number(id))
        if (res?.data && res?.code === 0) {
          postDetail.SET_POST(res.data)
        }
        postDetail.SET_LOADING_POST(false)
      },
    }
  },
})
