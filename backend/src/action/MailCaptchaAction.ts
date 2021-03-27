import { MailCaptcha } from 'models'
import { Transaction } from 'sequelize/types'

/**
 * 添加邮箱验证码信息
 * @param { MailCaptcha } mailCaptcha
 * @param { Transaction } t?
 */
const Create = async (
  mailCaptcha: MailCaptcha,
  t?: Transaction,
): Promise<MailCaptcha> => {
  return await mailCaptcha.save({ transaction: t })
}

/**
 * 查询邮箱验证码信息
 */
const Retrieve = async (email: string): Promise<MailCaptcha | null> => {
  return await MailCaptcha.findOne({
    where: {
      email,
    },
  })
}

/**
 * 更新邮箱验证码信息
 * @param { MailCaptcha } oldMailCaptcha
 * @param { MailCaptcha } newMailCaptcha
 * @param { Transaction } t?
 */
const Update = async (
  oldMailCaptcha: MailCaptcha,
  newMailCaptcha: MailCaptcha,
  t?: Transaction,
): Promise<MailCaptcha> => {
  return await Object.assign(oldMailCaptcha, newMailCaptcha).save({
    transaction: t,
  })
}

/**
 * 删除邮箱验证码信息
 * @param { number } id
 * @param { Transaction } t?
 */
const Delete = async (id: number, t?: Transaction): Promise<number> => {
  return await MailCaptcha.destroy({
    where: {
      id,
    },
    transaction: t,
  })
}

export default {
  Create,
  Retrieve,
  Update,
  Delete,
}
