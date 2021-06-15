import { Request } from '.'
import { Restful, _Restful } from './type'

const baseUrl = '/api/init'

export const Init = async () => {
  return await Request<_Restful>({
    method: 'POST',
    url: `${baseUrl}`,
  })
}

export const ForceInit = async () => {
  return await Request<_Restful>({
    method: 'POST',
    url: `${baseUrl}/force-admin`,
  })
}

export const GetTableRows = async () => {
  return await Request<Restful<number>>({
    method: 'GET',
    url: `${baseUrl}/table-rows-admin`,
  })
}
