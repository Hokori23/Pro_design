import { Request } from '.'
import { Restful } from './type'

const baseUrl = '/api/option'

export interface Option {
  module: string
  key: string
  value: string
}

export const RetrieveAll = async () => {
  return await Request<Restful<Option[]>>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
  })
}
