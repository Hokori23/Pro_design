const QUERY_METHODS = ['GET', 'DELETE']
const BODY_METHODS = ['POST', 'PUT']
const ROUTER_WHITE_LIST = [
  `user/register`,
  `user/login`,
  `user/retrieve`,
  `test`,
].map((v) => `/api/${v}`)
const isDev = process.env.NODE_ENV === 'development'

enum CodeDictionary {
  SUCCESS = 0,
  INIT_ERROR = 1,
  REGISTER_ERROR__USERACCOUNT_EXISTED = 2,
  LOGIN_ERROR = 3,
  RETRIEVE_ERROR__USER_NON_EXISTED = 4,
  UPLOAD_TYPE_ERROR = 5,
  CREATE_ERROR__LIVE_EXISTED = 6,
  CREATE_ERROR__LIVE_PARAM_WRONG = 7,
  PARAMS_ERROR = 98,
  COMMON_ERROR = 99,
  JWT_ERROR__REQUIRED = 100,
  JWT_ERROR__EXPIRED = 101,
}
export { QUERY_METHODS, BODY_METHODS, ROUTER_WHITE_LIST, isDev, CodeDictionary }
