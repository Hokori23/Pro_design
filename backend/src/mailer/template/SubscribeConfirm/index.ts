import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import moment from 'moment'
import juice from 'juice'
import { compilerStyleFile } from '../../utils/index'
import { BlogConfig } from '../../interface'
import { getBlogConfig } from '../NewPost'

moment.locale('zh-cn')

const obj = {
  cssOutputString: '',
} // 单例变量，作为缓存使用

export interface SubscribeConfirmAttributes {
  title: string
  accepter: {
    userName: string
    email: string
  }
  subscribeUrl: string
}

interface TemplateAttribute {
  title: string
  subscribeUrl: string
  userName: string
  email: string
  css: string
  time: string
  blogConfig: BlogConfig
}

const OutputTemplate = async (
  subscribeConfirmInfo: SubscribeConfirmAttributes,
  hotLoading: boolean = false,
): Promise<string> => {
  const { title, accepter, subscribeUrl } = subscribeConfirmInfo
  const { userName, email } = accepter
  obj.cssOutputString = await compilerStyleFile(
    path.resolve(__dirname, 'template.scss'),
    path.resolve(__dirname, 'template.css'),
    hotLoading,
    obj.cssOutputString,
  )
  // 若出现雪崩问题，可使用events.EventEmitter().once解决
  // 《深入浅出Node》Ch4.3 P77
  const template = fs.readFileSync(path.resolve(__dirname, 'template.ejs'))
  const params: TemplateAttribute = {
    title,
    subscribeUrl,
    userName: userName,
    email: email,
    css: `<style>${obj.cssOutputString}</style>`,
    blogConfig: await getBlogConfig(),
    time: moment().format('lll'),
  }
  return juice(ejs.render(template.toString(), params), {
    inlinePseudoElements: true,
  })
}
export default OutputTemplate
