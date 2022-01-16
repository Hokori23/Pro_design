import { Request } from '.'
import { Restful, _Restful } from './type'

const baseUrl = '/api/post-tag'
export interface PostTag {
  id?: number
  name: string
  description?: string
  slug: string
  iconClass?: string
  iconColor?: 'primary' | 'secondary'
  readonly createdAt?: Date
  readonly updatedAt?: Date
}

export const Create = async (tag: Partial<PostTag>) => {
  return await Request<Restful<PostTag>>({
    method: 'POST',
    data: tag,
    url: `${baseUrl}/create-admin`,
  })
}

export const RetrieveBySlug = async (slug: string) => {
  return await Request<Restful<PostTag>>({
    method: 'GET',
    url: `${baseUrl}/retrieve-slug`,
    params: { slug },
  })
}

export const RetrieveAll = async () => {
  return await Request<Restful<PostTag[]>>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
  })
}

export const Edit = async (tag: Partial<PostTag>) => {
  return await Request<Restful<PostTag>>({
    method: 'POST',
    data: tag,
    url: `${baseUrl}/edit-admin`,
  })
}

export const Delete = async (id: number) => {
  return await Request<_Restful>({
    method: 'POST',
    data: { id },
    url: `${baseUrl}/delete-admin`,
  })
}
