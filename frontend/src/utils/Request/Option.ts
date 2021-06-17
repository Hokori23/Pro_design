import { Request } from '.'
import { Restful } from './type'

const baseUrl = '/api/option'

export interface Option {
  module: string
  key: string
  value: string
  readonly createdAt?: Date
  readonly updatedAt?: Date
}

export const RetrieveAll = async () => {
  return await Request<Restful<Option[]>>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
  })
}

export const SaveAll = async (options: Option[]) => {
  return await Request<Restful<Option[]>>({
    method: 'POST',
    url: `${baseUrl}/save-admin`,
    data: { options },
  })
}
