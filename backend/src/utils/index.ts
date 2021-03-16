import CRYPTO from 'crypto'

import config from 'proj.config'
import { CodeDictionary } from './const'
const { cryptoConfig } = config

/**
 * 判断变量是否已定义
 * @param { object } v
 * @returns { boolean }
 */
const isDef = (v: any): boolean => {
  return v !== undefined && v !== null
}

/**
 * 判断变量是否未定义
 * 增加了 type guards: https://www.typescriptlang.org/docs/handbook/advanced-types.html#typeof-type-guards
 * @param { object } v
 * @returns { boolean }
 */
const isUndef = (v: any): v is null | undefined => {
  return v === undefined || v === null
}

/**
 * 重写isNaN方法
 * @description 会进行类型转换再判断NaN，可以判断字符串、数字、数字数组等
 * @example isNaN([1, 2, 3]) => false
 * @example isNaN(null) => false
 * @example isNaN(NaN) => true
 * @param { any } v
 * @returns { boolean }
 */
const isNaN = (v: any) => {
  if (isUndef(v)) return true
  if (v instanceof Array) {
    return v.some((v) => isNaN(v))
  }
  return Number.isNaN(Number(v))
}

/**
 * @param { Array<Object> } attrs
 * @description 如果前一个对象有当前对象的属性，则采用前一个对象的
 * @description 如果前一个对象没有当前对象的属性，则采用当前对象的
 * @description 针对Object.assign后面对象属性覆盖前面对象属性的问题
 */
const mixin = <T>(...objs: T[]): T => {
  if (!objs.length) throw new Error('参数错误: { objs: Object[] }')
  if (objs.length === 1) return objs[0]
  // 检查传参类型
  for (let i = objs.length - 1; i > 0; i--) {
    if (typeof objs[i] !== 'object') {
      throw new TypeError('参数类型错误: [ objs: Object[] ]')
    }
    Object.keys(objs[i]).forEach((key: string) => {
      if (isUndef(objs[i - 1][key])) {
        objs[i - 1][key] = objs[i][key]
      }
    })
  }
  return objs[0]
}

/**
 * 属性转数组
 * @param { Object } obj
 */
const toArray = (obj: Object): any[] => {
  const res = [] as any[]
  Object.keys(obj).forEach((key) => {
    res.push(obj[key])
  })
  return res
}

/**
 * 检查参数完整性
 * @param { Object } obj
 * @param { Array<string> } params
 */
const checkIntegrity = (obj: Object, params?: string[]): boolean => {
  return params
    ? params.every((v) => {
        return isDef(obj[v])
      })
    : toArray(obj).every((v) => {
        return isDef(v)
      })
}

/**
 * md5加密函数
 * @param { string } v 加密字段
 */
const md5Crypto = (v: string): string => {
  const { onceCryptLength, cryptCount, digest } = cryptoConfig
  const md5 = CRYPTO.createHash('md5')
  const vLength = v.length
  // 每次分段加密的字符串最大长度
  if (isDef(onceCryptLength) && onceCryptLength > 0) {
    while (v) {
      const tempV = v.slice(0, onceCryptLength)
      v = v.slice(onceCryptLength)
      md5.update(`${tempV} - `)
    }
    return md5.digest(digest)
  }
  // 一次加密至多分段几次加密
  if (isDef(cryptCount) && cryptCount > 0) {
    if (vLength <= cryptCount) {
      return md5.update(v).digest(digest)
    } else {
      const onceCryptLength = ~~(vLength / cryptCount)
      while (v) {
        const tempV = v.slice(0, onceCryptLength)
        v = v.slice(onceCryptLength)
        md5.update(`${tempV} - `)
      }
      return md5.digest(digest)
    }
  }
  throw new ReferenceError(
    'proj.config.js缺少字段cryptoConfig: { onceCryptLength: Number > 0, cryptCount: Number > 0 }',
  )
}

/**
 * cipher加密函数
 * @param { string } v 加密字段
 * @param { string } password 生成密钥的密码
 */
const cipherCrypto = (v: string | null, password: string) => {
  if (!v) {
    return null
  }
  const key = CRYPTO.scryptSync(password, '盐值', 24)
  const iv = Buffer.alloc(16, 0) // 初始化向量
  const cipher = CRYPTO.createCipheriv('aes-192-cbc', key, iv)
  cipher.update(v)
  return cipher.final('hex')
}

/**
 * cipher解密函数
 * @param { string } v 解密字段
 * @param { string } password 生成密钥的密码
 */
const decipherCrypto = (v: string | null, password: string) => {
  if (!v) {
    return null
  }
  const key = CRYPTO.scryptSync(password, '盐值', 24)
  const iv = Buffer.alloc(16, 0) // 初始化向量
  const decipher = CRYPTO.createDecipheriv('aes-192-cbc', key, iv)
  decipher.update(v, 'hex')
  return decipher.final('utf-8')
}

/**
 * Restful API类声明
 */
class Restful {
  code: CodeDictionary
  message: string
  data?: any
  constructor(code: number, message: string, data: any = null) {
    this.code = code
    this.message = message
    data && (this.data = data)
  }

  static initWithError(e: any) {
    return new Restful(e.errno, e.message)
  }
}

export {
  isDef,
  isUndef,
  isNaN,
  mixin,
  toArray,
  checkIntegrity,
  md5Crypto,
  cipherCrypto,
  decipherCrypto,
  Restful,
}
