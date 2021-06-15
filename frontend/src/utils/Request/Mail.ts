import { Request } from '.'
import { Restful } from './type'

const baseUrl = '/api/mail'

export interface Mail {
  id: number | null
  uid: number
  isSubscribed: boolean
  createdAt?: Date
  updatedAt?: Date
}

export const Retrieve = async (uid: number) => {
  return await Request<Restful<Mail>>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
    params: {
      uid,
    },
  })
}

export const Edit = async (user: Partial<Mail>) => {
  return await Request<Restful<Mail>>({
    method: 'POST',
    url: `${baseUrl}/edit`,
    data: user,
  })
}
