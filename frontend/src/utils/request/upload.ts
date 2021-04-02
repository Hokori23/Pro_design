import { Request } from '.'
const baseUrl = '/api/upload'

export enum FileType {
  image = 0,
  video = 1,
}

export interface UploadConfig {
  url: string
  payload: any
}
export const GetAuthorizationAndPolicy = async (
  fileName: string,
  fileType: FileType,
  payload: any,
) => {
  return await Request<UploadConfig>({
    method: 'GET',
    url: `${baseUrl}/token`,
    params: {
      fileName,
      fileType,
      payload,
    },
  })
}
export const Upload = async (formData: FormData, payload: any, url: string) => {
  Object.keys(payload).map((key) => {
    formData.append(key, payload[key])
  })
  return await Request<any>({
    method: 'POST',
    url,
    data: formData,
  })
}
