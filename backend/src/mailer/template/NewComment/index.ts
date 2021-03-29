import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import moment from 'moment'
import juice from 'juice'
import { BlogConfig } from '../../interface'
import { isDev } from '@const'
import { Post } from '@models'

const fsp = fs.promises
moment.locale('zh-cn')

const obj = {
  cssOutputString: '',
  ejsOutputString: '',
} // 单例变量，作为缓存使用

export interface NewCommentAttributes {
  title: string
  accepter: {
    userName: string
    email: string
  }
  post: Post
  senderName: string
  originComment: string
  replyComment: string
  blogConfig: BlogConfig
}

interface TemplateAttribute {
  title: string
  post: Post
  originComment: string
  replyComment: string
  userName: string
  senderName: string
  email: string
  css: string
  time: string
  blogConfig: BlogConfig
}

export const OutputTemplate = async (
  subscribeConfirmInfo: NewCommentAttributes,
): Promise<string> => {
  const {
    title,
    accepter,
    originComment,
    replyComment,
    blogConfig,
    post,
    senderName,
  } = subscribeConfirmInfo
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
    post,
    originComment,
    replyComment,
    userName,
    senderName,
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
export const exampleAttribute: NewCommentAttributes = {
  title: '你在 [埃と誇り] 的评论有了新的回复！',
  post: Post.build({
    id: 1,
    title: 'postTitle',
    content: ' content',
  }),
  accepter: {
    userName: 'testName',
    email: 'example@example.com',
  },
  senderName: 'sender',
  originComment:
    '原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论原评论',
  replyComment: '回复的评论',
  blogConfig: {
    blogger: 'blogger',
    avatarUrl: '#',
    blogName: 'blogName',
    publicPath: 'http://example.com',
  },
}
export default OutputTemplate
