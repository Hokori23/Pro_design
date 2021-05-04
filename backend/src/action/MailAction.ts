import { Mail } from 'models'
import { Transaction } from 'sequelize/types'

/**
 * 添加邮箱信息
 * @param { Mail } mail
 * @param { Transaction } t?
 */
const Create = async (mail: Mail, t?: Transaction): Promise<Mail> => {
  return await mail.save({ transaction: t })
}

/**
 * 遍历邮箱信息
 */
const Retrieve__All = async (): Promise<Mail[]> => {
  return await Mail.findAll()
}

/**
 * 通过uid查询邮箱信息
 * @param { number } uid
 */
const Retrieve__UID = async (uid: number): Promise<Mail | null> => {
  return await Mail.findOne({
    where: {
      uid,
    },
  })
}

/**
 * 更新邮箱信息
 * @param { Mail } oldMail
 * @param { Mail } newMail
 */
const Update = async (oldMail: Mail, newMail: Mail): Promise<Mail> => {
  return await Object.assign(oldMail, newMail).save()
}

/**
 * 删除邮箱信息
 * @param { number } id
 */
const Delete = async (id: number): Promise<number> => {
  return await Mail.destroy({
    where: {
      id,
    },
  })
}

export default {
  Create,
  Retrieve__All,
  Retrieve__UID,
  Update,
  Delete,
}
