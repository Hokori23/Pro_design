export const ACCESS_TOKEN_NAME = 'ACCESS_TOKEN'
export const USER_INFO_NAME = 'USER_INFO'
export const BLOG_CONFIG = 'BLOG_CONFIG'
export const UPYUN_URL = 'https://upyun.hokori.online'
export const REQUEST_WHITE_LIST: RegExp[] = [/^https:\/\/v0.api.upyun.com/]
export const isDev = process.env.NODE_ENV === 'development'
export const SECOND = 1000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
