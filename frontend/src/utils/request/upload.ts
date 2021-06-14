import { Request } from '.'
import { Restful, UploadRestful } from './type'
const baseUrl = '/api/upload'

export enum FileType {
  IMAGE = 0,
  VIDEO = 1,
}

export interface UploadConfig {
  url: string
  payload: any
}

export interface FileProps {
  fileName: string
  formData: FormData
}

export const GetAuthorizationAndPolicy = async (
  fileName: string,
  fileType: FileType,
  payload?: any,
) => {
  return await Request<Restful<UploadConfig>>({
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
  return await Request<UploadRestful>({
    method: 'POST',
    url,
    data: formData,
  })
}

export const handleUpload = async (
  { fileName, formData }: FileProps,
  type: FileType,
) => {
  // 请求Authorization和Policy
  const res = await GetAuthorizationAndPolicy(fileName, type)
  if (!res?.data) return
  const { url, payload } = res.data

  // 上传又拍云
  return await Upload(formData, payload, url)
}
