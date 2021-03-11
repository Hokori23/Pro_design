const QUERY_METHODS = ['GET', 'DELETE']
const BODY_METHODS = ['POST', 'PUT']
const ROUTER_WHITE_LIST = [
  `init`,
  `test`,
  `user/init`,
  `user/register`,
  `user/login`,
  `user/retrieve`,
  `post/retrieve`,
  `post/retrieve-tag`,
].map((v) => `/api/${v}`)
const isDev = process.env.NODE_ENV === 'development'

enum CodeDictionary {
  SUCCESS = 0,
  // Init
  INIT_ERROR__DATABASE_ERROR = 1,
  INIT_ERROR__DATABASE_EXISTED = 2,
  INIT_ERROR__USERACCOUNT_EXISTED = 3,
  // User
  REGISTER_ERROR__USERACCOUNT_EXISTED = 4,
  LOGIN_ERROR = 5,
  RETRIEVE_ERROR__USER_NON_EXISTED = 6,
  DELETE_ERROR__USER = 7,
  // Post
  SERVICE_ERROR__NEED_TITLE = 8,
  RETRIEVE_ERROR__POST_NON_EXISTED = 9,
  DELETE_ERROR__POST_NO_PERMISSION = 10,
  DELETE_ERROR__POST = 11,
  UPLOAD_TYPE_ERROR = 12,
  CREATE_ERROR__LIVE_EXISTED = 13,
  CREATE_ERROR__LIVE_PARAM_WRONG = 14,
  PARAMS_ERROR = 98,
  COMMON_ERROR = 99,
  JWT_ERROR__REQUIRED = 100,
  JWT_ERROR__EXPIRED = 101,
}
export { QUERY_METHODS, BODY_METHODS, ROUTER_WHITE_LIST, isDev, CodeDictionary }
