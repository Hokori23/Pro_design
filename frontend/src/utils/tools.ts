import _markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export const isDef = <T>(v: T | undefined | null): v is T =>
  v !== undefined && v !== null

export const isUndef = (v: any): v is undefined | null =>
  v === undefined || v === null

export const isEmail = (v: string): boolean =>
  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(v)

export const stringifyObjToUrl = (obj: { [key: string]: any }): string => {
  const params = new URLSearchParams()
  for (const key in obj) {
    params.set(key, obj[key])
  }
  return params.toString()
}
export const JsonClone = <T>(v: T): T => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(JSON.stringify(v))
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const markdownIt = new _markdownIt({
  html: true, // 在源码中启用 HTML 标签
  typographer: true, // 启用一些语言中立的替换 + 引号美化
  breaks: true, // 转换段落里的 '\n' 到 <br>。
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }

    return '' // 使用额外的默认转义
  },
})

export const scrollIntoTop = (
  block: 'center' | 'end' | 'nearest' | 'start' | undefined = 'center',
  behavior: 'smooth' | 'auto' | undefined = 'smooth',
) => {
  const anchor = document.querySelector('#back-to-top-anchor')
  if (anchor) {
    anchor.scrollIntoView({ behavior, block })
  }
}
export const scrollIntoBottom = () => {
  const anchor = document.querySelector('#go-to-bottom-anchor')
  if (anchor) {
    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

export default {
  isDef,
  isUndef,
  isEmail,
  stringifyObjToUrl,
  JsonClone,
  markdownIt,
  scrollIntoTop,
  scrollIntoBottom,
}
