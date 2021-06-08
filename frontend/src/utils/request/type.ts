enum CodeDictionary {
  SUCCESS = 0,
  REGISTER_ERROR__USER_EXISTED = 1,
  LOGIN_ERROR = 2,
  RETRIEVE_ERROR__USER_NON_EXISTED = 3,
  PARAMS_ERROR = 98,
  COMMON_ERROR = 99,
  JWT_ERROR__REQUIRED = 100,
  JWT_ERROR__EXPIRED = 101,
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
