import { Request } from '.'
import { User } from './User'
import { Restful, _Restful } from './type'

const baseUrl = '/api/post-comment'
export interface PostComment {
  id: number
  rootId?: number
  parentId?: number
  pid: number
  uid: number
  content: string
  email: string
  url?: string
  ip: string
  userAgent?: string
  likesCount: number
  dislikesCount: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface PostCommentWithAuthor extends PostComment {
  author?: User
}

export interface FormattedPostComment extends PostCommentWithAuthor {
  children?: FormattedPostComment[]
  parent?: FormattedPostComment
}

export const Create = async (comment: Partial<PostComment>) => {
  return await Request<Restful<PostComment>>({
    method: 'POST',
    data: comment,
    url: `${baseUrl}/create`,
  })
}

export const Retrieve__PID = async (pid: number) => {
  return await Request<Restful<PostComment[]>>({
    method: 'GET',
    data: {
      pid,
    },
    url: `${baseUrl}/retrieve-pid`,
  })
}

export const Delete = async (id: number) => {
  return await Request<_Restful>({
    method: 'POST',
    data: { id },
    url: `${baseUrl}/delete-admin`,
  })
}

export const Like = async (id: number) => {
  return await Request<_Restful>({
    method: 'POST',
    data: { id },
    url: `${baseUrl}/like`,
  })
}

export const Dislike = async (id: number) => {
  return await Request<_Restful>({
    method: 'POST',
    data: { id },
    url: `${baseUrl}/dislike`,
  })
}
