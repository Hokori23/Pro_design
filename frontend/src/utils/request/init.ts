import { Request } from '.'

const baseUrl = '/api/init'

export const Init = async () => {
  return await Request<any>({
    method: 'POST',
    url: `${baseUrl}`,
  })
}

export const ForceInit = async () => {
  return await Request<any>({
    method: 'POST',
    url: `${baseUrl}/force-admin`,
  })
}

export const GetTableRows = async () => {
  return await Request<number>({
    method: 'GET',
    url: `${baseUrl}/table-rows-admin`,
  })
}
