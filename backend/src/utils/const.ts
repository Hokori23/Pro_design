const QUERY_METHODS = ['GET', 'DELETE']
const BODY_METHODS = ['POST', 'PUT']
const ROUTER_WHITE_LIST = [
  // init
  `init`,
  // test
  `test`,
  // user
  `user/init`,
  `user/register`,
  `user/login`,
  `user/retrieve`,
  // post
  `post/retrieve-id`,
  `post/retrieve`,
  `post/retrieve-tag`,
].map((v) => `/api/${v}`)

const ROUTER_ADMIN_ALLOW = [
  // user
  `user/edit-admin`,
  `user/delete-admin`,
  // post
  `post/create`,
  `post/edit`,
  `post/edit-admin`,
  `post/delete`,
  `post/delete-admin`,
  // comment
  `post-comment/delete-admin`,
  // post-tag
  `post-tag/create-admin`,
  `post-tag/edit-admin`,
  `post-tag/delete-admin`,
].map((v) => `/api/${v}`)

const ROUTER_SUPER_ADMIN_ALLOW = [
  // init
  `init/force-admin`,
  `init/table-rows-admin`,
].map((v) => `/api${v}`)

const isDev = process.env.NODE_ENV === 'development'

enum CodeDictionary {
  SUCCESS = 0,
  // Init
  INIT_ERROR__DATABASE_ERROR,
  INIT_ERROR__DATABASE_EXISTED,
  INIT_ERROR__USERACCOUNT_EXISTED,
  // User
  REGISTER_ERROR__NOT_INIT,
  REGISTER_ERROR__USER_ACCOUNT_EXISTED,
  LOGIN_ERROR,
  RETRIEVE_ERROR__USER_NON_EXISTED,
  DELETE_ERROR__USER,
  DELETE_ERROR__USER_ADMIN,
  // Post
  SERVICE_ERROR__POST_NEED_TITLE,
  RETRIEVE_ERROR__POST_NON_EXISTED,
  DELETE_ERROR__POST_NO_PERMISSION,
  DELETE_ERROR__POST,
  // PostComment
  SERVICE_ERROR__COMMENT_POST_NON_EXISTED,
  SERVICE_ERROR__COMMENT_PARENT_COMMENT_NON_EXISTED,
  SERVICE_ERROR__COMMENT_NON_EXISTED,
  DELETE_ERROR__COMMENT,
  SERVICE_ERROR__COMMENT_USER_NON_EXISTED,
  SERVICE_ERROR__COMMENT_EMAIL_NEEDED,
  // PostTag
  SERVICE_ERROR__TAG_EXISTED,
  SERVICE_ERROR__TAG_NON_EXISTED,
  // OTHER
  UPLOAD_TYPE_ERROR,
  PARAMS_ERROR = 98,
  COMMON_ERROR = 99,
  JWT_ERROR__REQUIRED = 100,
  JWT_ERROR__EXPIRED = 101,
}
export {
  QUERY_METHODS,
  BODY_METHODS,
  ROUTER_WHITE_LIST,
  ROUTER_ADMIN_ALLOW,
  ROUTER_SUPER_ADMIN_ALLOW,
  isDev,
  CodeDictionary,
}
