import { MailAction as Action } from '@action'
import { CodeDictionary } from '@const'
import { Mail } from '@models'
import { isUndef, Restful } from '@utils'

/**
 * 通过uid查询邮箱信息
 * @param { string } uid
 */
const Retrieve__UID = async (uid: string): Promise<Restful> => {
  try {
    const mail = await Action.Retrieve__UID(Number(uid))
    if (isUndef(mail)) {
      return new Restful(
        CodeDictionary.EMAIL_ERROR__NON_EXISTED,
        '邮箱设置信息不存在',
      )
    }
    return new Restful(
      CodeDictionary.SUCCESS,
      '查询邮箱设置信息成功',
      mail.toJSON(),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询失败, ${String(e.message)}`,
    )
  }
}

/**
 * 编辑邮箱信息
 * @param { Mail } mail
 */
const Edit = async (mail: Mail): Promise<Restful> => {
  try {
    const existedMail = await Action.Retrieve__UID(mail.uid)
    if (isUndef(existedMail)) {
      return new Restful(
        CodeDictionary.EMAIL_ERROR__NON_EXISTED,
        '邮箱设置信息不存在',
      )
    }
    mail = await Action.Update(existedMail, mail)
    return new Restful(
      CodeDictionary.SUCCESS,
      '编辑邮箱设置信息成功',
      mail.toJSON(),
    )
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `编辑邮箱设置信息失败, ${String(e.message)}`,
    )
  }
}

export default {
  Retrieve__UID,
  Edit,
}
