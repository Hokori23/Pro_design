import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import moment from 'moment'
import juice from 'juice'
import { BlogConfig } from '../../interface'
import { isDev } from '@const'

const fsp = fs.promises
moment.locale('zh-cn')

const obj = {
  cssOutputString: '',
  ejsOutputString: '',
} // 单例变量，作为缓存使用

export interface MailConfirmAttributes {
  title: string
  accepter: {
    userName: string
    email: string
  }
  captcha: string
  blogConfig: BlogConfig
}

interface TemplateAttribute {
  title: string
  captcha: string
  userName: string
  email: string
  css: string
  time: string
  blogConfig: BlogConfig
}

export const OutputTemplate = async (
  subscribeConfirmInfo: MailConfirmAttributes,
): Promise<string> => {
  const { title, accepter, captcha, blogConfig } = subscribeConfirmInfo
  const { userName, email } = accepter
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
    captcha,
    userName: userName,
    email: email,
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
export const exampleAttribute: MailConfirmAttributes = {
  title: 'testTitle',
  accepter: {
    userName: 'testName',
    email: 'example@example.com',
  },
  blogConfig: {
    blogger: 'blogger',
    avatarUrl: '#',
    blogName: 'blogName',
    publicPath: '#',
  },
  captcha: 'ABCD123456',
}
export default OutputTemplate
