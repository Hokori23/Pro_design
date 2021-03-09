import { Mail } from 'models'

/**
 * 添加邮箱信息
 * @param { Mail } mail
 */
const Create = async (mail: Mail) => {
  return await mail.save()
}

/**
 * 遍历邮箱信息
 */
const Retrieve__All = async (): Promise<Mail[]> => {
  return await Mail.findAll()
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
  Update,
  Delete,
}
