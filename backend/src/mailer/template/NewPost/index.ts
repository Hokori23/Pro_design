// import fs from 'fs/promises'
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import moment from 'moment'
import juice from 'juice'
import { OptionAction, UserAction } from '@action'
import { isUndef } from '@utils'
import { User, Option } from '@models'
import { FormattedOption } from '@action/OptionAction'
import { CodeDictionary } from '@const'
import { compilerStyleFile } from '../../utils'
import { BlogConfig } from '../../interface'

const fsp = fs.promises
moment.locale('zh-cn')

interface NewPostInfoAttribute {
  title: string
  postTitle: string
  newPostUrl: string
}

interface TemplateAttribute {
  title: string
  postTitle: string
  newPostUrl: string
  css: string
  time: string
  blogConfig: BlogConfig
}

const obj = {
  cssOutputString: '',
} // 单例变量，作为缓存使用

export const getBlogConfig = async (): Promise<BlogConfig> => {
  const tasks = [
    UserAction.Retrieve__Super_Admin(),
    OptionAction.Retrieve__All(),
  ]
  const values = await Promise.all(tasks as any)
  const superAdmin = values[0] as User | null
  if (isUndef(superAdmin)) {
    throw new Error(String(CodeDictionary.EMAIL_ERROR__USER_NOT_INIT))
  }
  const { userName, avatarUrl } = superAdmin
  const rawOptions = values[1] as Option[]
  const formattedOption: Partial<FormattedOption> = {}
  rawOptions.forEach((v) => {
    formattedOption[v.module][v.key] = v.value
  })
  if (String(formattedOption.email?.isActivated) === '0') {
    throw new Error(String(CodeDictionary.EMAIL_ERROR__NOT_ACTIVE))
  }
  return {
    blogger: userName,
    avatarUrl: avatarUrl || '',
    blogName: formattedOption.system?.blogName || '',
    publicPath: formattedOption.system?.publicPath || '',
  }
}

const OutputTemplate = async (
  newPostInfo: NewPostInfoAttribute,
  hotLoading: boolean = false,
): Promise<string> => {
  const { title, postTitle, newPostUrl } = newPostInfo
  obj.cssOutputString = await compilerStyleFile(
    path.resolve(__dirname, 'template.scss'),
    path.resolve(__dirname, 'template.css'),
    hotLoading,
    obj.cssOutputString,
  )
  // 若出现雪崩问题，可使用events.EventEmitter().once解决
  // 《深入浅出Node》Ch4.3 P77
  const template = await fsp.readFile(path.resolve(__dirname, 'template.ejs'))
  const params: TemplateAttribute = {
    title,
    postTitle,
    newPostUrl,
    css: `<style>${obj.cssOutputString}</style>`,
    blogConfig: await getBlogConfig(),
    time: moment().format('lll'),
  }
  return juice(ejs.render(template.toString(), params), {
    inlinePseudoElements: true,
  })
}
export default OutputTemplate
