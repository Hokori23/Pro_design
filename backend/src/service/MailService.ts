import { MailAction as Action, OptionAction } from '@action'
import { Mail, User } from '@models'
import { md5Crypto, Restful } from '@utils'
import { CodeDictionary } from '@const'
import { Transaction } from 'sequelize/types'
import { send, template } from '@mailer'
import { FormattedOption } from '@action/OptionAction'
import sequelize from '@database'
import { SubscribeConfirmAttributes } from '@mailer/template/SubscribeConfirm'

/**
 * 发送订阅邮件
 * @param { User } user
 * @param { Transaction } t?
 */
const Subscribe = async (user: User, t?: Transaction): Promise<Restful> => {
  t = t || (await sequelize.transaction())
  try {
    const { id, userName, userAccount, email } = user
    const key = md5Crypto(`${String(id)} - ${userAccount}`)
    const mail = Mail.build({
      uid: id,
      key,
    })
    const rawOptions = await OptionAction.Retrieve__All()
    const formattedOption: Partial<FormattedOption> = {}
    rawOptions.forEach((v) => {
      formattedOption[v.module][v.key] = v.value
    })
    const SubscribeConfirmInfo: SubscribeConfirmAttributes = {
      title: `确认订阅${formattedOption.system?.blogName as string}`,
      accepter: { userName, email },
      subscribeUrl: `${
        formattedOption.system?.publicPath as string
      }/mail/subscribe?key=${key}`,
    }
    await Action.Create(mail, t)
    await send(
      SubscribeConfirmInfo.title,
      await template.SubscribeConfirm(SubscribeConfirmInfo),
      {
        name: userName,
        address: email,
      },
    )
    await t.commit()
    return new Restful(CodeDictionary.SUCCESS, '发送订阅邮件成功')
  } catch (e) {
    await t.rollback()
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `发送订阅邮件失败, ${String(e.message)}`,
    )
  }
}
export default {
  Subscribe,
}
