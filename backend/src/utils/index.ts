/* eslint-disable valid-typeof */
import CRYPTO from 'crypto'
import fs from 'fs'
import precss from 'precss'
import path from 'path'
import chalk from 'chalk'

import config from 'proj.config'
import { CodeDictionary } from './const'
const fsp = fs.promises

const { cryptoConfig } = config

/**
 * 判断变量是否已定义
 * @param { object } v
 * @returns { boolean }
 */
export const isDef = <T>(v: T | undefined | null): v is T =>
  v !== undefined && v !== null

/**
 * 判断变量是否未定义
 * 增加了 type guards: https://www.typescriptlang.org/docs/handbook/advanced-types.html#typeof-type-guards
 * @param { object } v
 * @returns { boolean }
 */
export const isUndef = (v: unknown): v is undefined | null =>
  v === undefined || v === null

export const isEmpty = (v: string): boolean => {
  return v === ''
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
export const isNaN = (v: any) => {
  if (isUndef(v)) return true
  if (v instanceof Array) {
    return v.some((v) => isNaN(v))
  }
  return Number.isNaN(Number(v))
}

export enum PrimitiveType {
  undefined = 'undefined',
  number = 'number',
  string = 'string',
  boolean = 'boolean',
  function = 'function',
  symbol = 'symbol',
  object = 'object',
  bigint = 'bigint',
}
/**
 * 判断是否为某基本类型数组
 * @param
 */
export const isPrimitiveArray = (arr: any[], type: PrimitiveType): boolean => {
  return arr.every((v) => typeof v === type)
}

/**
 * @param { Array<Object> } attrs
 * @description 如果前一个对象有当前对象的属性，则采用前一个对象的
 * @description 如果前一个对象没有当前对象的属性，则采用当前对象的
 * @description 针对Object.assign后面对象属性覆盖前面对象属性的问题
 */
export const mixin = <T>(...objs: T[]): T => {
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
export const toArray = (obj: Object): string[] => {
  const res: string[] = []
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
export const checkIntegrity = <T>(obj: T, params?: Array<keyof T>): boolean => {
  return params
    ? params.every((v) => {
        return isDef(obj[v])
      })
    : toArray(obj).every((v) => {
        return isDef(v)
      })
}

/**
 * @param { Function } callback 回调函数
 * @param { number } delay 延迟ms
 * @description 输出一个经过防抖处理的函数
 */
export const debounce = (
  callback: (...args: any[]) => any,
  delay: number,
): Function => {
  return (() => {
    let timer: number | any = null
    return (...params: any[]) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(callback, delay, params)
    }
  })()
}

/**
 * md5加密函数
 * @param { string } v 加密字段
 */
export const md5Crypto = (v: string): string => {
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
export const cipherCrypto = (v: string | null, password: string) => {
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
export const decipherCrypto = (v: string | null, password: string) => {
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
 * 查询文件
 * @param { string } filePath
 * @param { File[] } filesList
 * @param { RegExp } reg
 * @returns
 */
export interface File {
  path: string
  name: string
}
const ignoreDirectory = ['node_modules', '.git', 'build']
export const findSrcFiles = (
  filePath: string,
  filesList: File[],
  reg: RegExp,
) => {
  const files = fs.readdirSync(filePath)
  files.forEach((name) => {
    if (ignoreDirectory.includes(name)) return

    const childFilePath = path.resolve(filePath, name)
    const stat = fs.statSync(childFilePath)

    if (stat.isDirectory()) {
      findSrcFiles(childFilePath, filesList, reg)
      return
    }

    if (reg.test(name)) {
      filesList.push({
        path: childFilePath,
        name,
      })
    }
  })
  return filesList
}

/**
 * 编译sass/scss文件
 * @param { string } importPath css文件路径
 * @returns { Promise<string> }
 */
export const sassCompiler = async (importPath: string): Promise<string> => {
  return precss
    .process(await fsp.readFile(importPath), {
      from: importPath,
    })
    .then(async (result) => {
      result.warnings().forEach((warn) => {
        // eslint-disable-next-line no-console
        warn && console.log(chalk.yellow(warn))
      })
      return result.css.replace(/[\r|\t|\n]/g, '')
    })
}

/**
 * Restful API类声明
 */
export class Restful {
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
