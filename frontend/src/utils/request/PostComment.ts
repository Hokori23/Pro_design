export interface PostComment {
  id: number
  parentId?: number
  pid: number
  uid: number
  content: string
  email: string
  url?: string
  ip: string
  userAgent?: string
  likesCount?: number
  dislikesCount?: number
  readonly createdAt: Date
  readonly updatedAt: Date
}
