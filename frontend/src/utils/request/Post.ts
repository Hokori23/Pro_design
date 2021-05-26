import { Request } from '.'
import { PostComment } from './PostComment'
import { Restful, _Restful } from './type'
import { User } from './User'

const baseUrl = '/api/post'

export enum PostType {
  POST = 0,
  LANDSCAPE = 1,
  MOMENT = 2,
  PAGE = 3, // TODO: 自定义页面
}
export enum Toggle {
  N = 0,
  Y = 1,
}

export interface Post {
  id?: number
  uid: number
  title?: string
  coverUrl?: string
  content: string
  type?: PostType
  draftContent?: string
  isDraft: Toggle
  isHidden: Toggle
  isLocked: Toggle
  priority: number
  likesCount: number
  dislikesCount: number
  pageViews: number
  postComments?: PostComment[]
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface PostWithAuthor extends Post {
  author: User
}

export interface Posts {
  posts: Post[]
  total: number
}

export const Create = async (post: Partial<Post>) => {
  return await Request<Restful<Post>>({
    method: 'POST',
    data: post,
    url: `${baseUrl}/create`,
  })
}

export const Retrieve = async (id: number) => {
  return await Request<Restful<PostWithAuthor>>({
    method: 'GET',
    params: {
      id,
    },
    url: `${baseUrl}/retrieve-id`,
  })
}

export const Retrieve__Admin = async (id: number) => {
  return await Request<Restful<PostWithAuthor>>({
    method: 'GET',
    params: {
      id,
    },
    url: `${baseUrl}/retrieve-id-admin`,
  })
}

export const RetrieveAll = async (
  page: number,
  capacity: number,
  isASC: Toggle,
  postTypes: PostType[] = [],
) => {
  return await Request<Restful<Posts>>({
    method: 'GET',
    params: {
      page,
      capacity,
      isASC,
      postTypes,
    },
    url: `${baseUrl}/retrieve`,
  })
}

export const RetrieveAll__Admin = async (
  page: number,
  capacity: number,
  isASC: Toggle,
  postTypes: PostType[] = [],
) => {
  return await Request<Restful<Posts>>({
    method: 'GET',
    params: {
      page,
      capacity,
      isASC,
      postTypes,
    },
    url: `${baseUrl}/retrieve-admin`,
  })
}

export const RetrieveTag = async (
  page: number,
  capacity: number,
  isASC: Toggle,
  tids: number[],
  postTypes: PostType[] = [],
) => {
  return await Request<Restful<Posts>>({
    method: 'GET',
    params: {
      page,
      capacity,
      tids,
      isASC,
      postTypes,
    },
    url: `${baseUrl}/retrieve-tag`,
  })
}

export const RetrieveTag__Admin = async (
  page: number,
  capacity: number,
  isASC: Toggle,
  tids: number[],
  postTypes: PostType[] = [],
) => {
  return await Request<Restful<Posts>>({
    method: 'GET',
    params: {
      page,
      capacity,
      tids,
      isASC,
      postTypes,
    },
    url: `${baseUrl}/retrieve-tag-admin`,
  })
}

export const Edit = async (post: Partial<Post>) => {
  return await Request<Restful<Post>>({
    method: 'POST',
    data: post,
    url: `${baseUrl}/edit`,
  })
}

export const Edit__Admin = async (post: Partial<Post>) => {
  return await Request<Restful<Post>>({
    method: 'POST',
    data: post,
    url: `${baseUrl}/edit-admin`,
  })
}
export const Delete = async (id: number) => {
  return await Request<Restful<Post>>({
    method: 'POST',
    data: {
      id,
    },
    url: `${baseUrl}/delete`,
  })
}

export const Delete__Admin = async (id: number) => {
  return await Request<Restful<Post>>({
    method: 'POST',
    data: {
      id,
    },
    url: `${baseUrl}/delete-admin`,
  })
}

export const Like = async (id: number) => {
  return await Request<_Restful>({
    method: 'POST',
    data: {
      id,
    },
    url: `${baseUrl}/like`,
  })
}

export const Dislike = async (id: number) => {
  return await Request<_Restful>({
    method: 'POST',
    data: {
      id,
    },
    url: `${baseUrl}/dislike`,
  })
}
