import { Request } from '.'
import { Restful } from './type'

const baseUrl = '/api/mail'

export interface Mail {
  id: number | null
  uid: number
  isSubscribed: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export const Retrieve = async () => {
  return await Request<Restful<Mail>>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
  })
}

export const Retrieve__Admin = async (uid: number) => {
  return await Request<Restful<Mail>>({
    method: 'GET',
    url: `${baseUrl}/retrieve-admin`,
    params: {
      uid,
    },
  })
}

export const Edit = async (mail: Partial<Mail>) => {
  return await Request<Restful<Mail>>({
    method: 'POST',
    url: `${baseUrl}/edit`,
    data: mail,
  })
}

export const Edit__Admin = async (mail: Partial<Mail>) => {
  return await Request<Restful<Mail>>({
    method: 'POST',
    url: `${baseUrl}/edit-admin`,
    data: mail,
  })
}
