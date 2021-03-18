import { OptionAction, UserAction } from '@action'
import { FormattedOption } from '@action/OptionAction'
import { CodeDictionary } from '@const'
import { BlogConfig } from '@mailer/interface'
import { User, Option } from '@models'
import { isUndef } from '@utils'

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
    if (!formattedOption[v.module]) formattedOption[v.module] = {}
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
