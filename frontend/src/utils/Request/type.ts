export enum CodeDictionary {
  SUCCESS = 0,
  PARAMS_ERROR = 98,
  COMMON_ERROR = 99,
  JWT_ERROR__REQUIRED = 100,
  JWT_ERROR__EXPIRED = 101,
  UPYUN_SUCCESS = 200,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface _Restful {
  code: CodeDictionary
  message: string
}

export interface Restful<T> extends _Restful {
  data?: T
}

export interface UploadRestful extends _Restful {
  url: string
}
