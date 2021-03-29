// import fs from 'fs/promises'
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import moment from 'moment'
import juice from 'juice'
import { isDev } from '@const'
import { BlogConfig } from '../../interface'

const fsp = fs.promises
moment.locale('zh-cn')

export interface NewPostInfoAttribute {
  title: string
  postTitle: string
  newPostUrl: string
  userName: string
  blogConfig: BlogConfig
}

interface TemplateAttribute {
  title: string
  userName: string
  postTitle: string
  newPostUrl: string
  css: string
  time: string
  blogConfig: BlogConfig
}

const obj = {
  cssOutputString: '',
  ejsOutputString: '',
} // 单例变量，作为缓存使用

export const OutputTemplate = async (
  newPostInfo: NewPostInfoAttribute,
): Promise<string> => {
  const { title, postTitle, newPostUrl, userName, blogConfig } = newPostInfo
  if (isDev || !obj.cssOutputString) {
    obj.cssOutputString = (
      await fsp.readFile(path.resolve(__dirname, 'template.css'))
    ).toString()
  }
  if (isDev || !obj.ejsOutputString) {
    obj.ejsOutputString = (
      await fsp.readFile(path.resolve(__dirname, 'template.ejs'))
    ).toString()
  }
  const params: TemplateAttribute = {
    title,
    userName,
    postTitle,
    newPostUrl,
    css: `<style>${obj.cssOutputString}</style>`,
    blogConfig,
    time: moment().format('lll'),
  }
  return juice(ejs.render(obj.ejsOutputString, params), {
    inlinePseudoElements: true,
  })
}

/**
 * 测试数据
 * @name exampleAttribute 不能为其他命名
 */
export const exampleAttribute: NewPostInfoAttribute = {
  userName: 'User',
  title: 'testTitle',
  postTitle: 'postTitle',
  newPostUrl: 'https://example.com/post/1',
  blogConfig: {
    blogger: 'blogger',
    avatarUrl: '#',
    blogName: 'blogName',
    publicPath: '#',
  },
}

export default OutputTemplate
