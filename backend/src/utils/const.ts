const QUERY_METHODS = ['GET', 'DELETE']
const BODY_METHODS = ['POST', 'PUT']
const ROUTER_WHITE_LIST = [`user/register`, `user/login`, `test`].map(
  (v) => `/api/${v}`,
)
const isDev = process.env.NODE_ENV === 'development'
export { QUERY_METHODS, BODY_METHODS, ROUTER_WHITE_LIST, isDev }
