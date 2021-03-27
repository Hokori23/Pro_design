// import { MailAction as Action, OptionAction, MailCaptchaAction } from '@action'
// import { Mail, MailCaptcha, User } from '@models'
// import { isUndef, md5Crypto, Restful } from '@utils'
// import { CodeDictionary } from '@const'
// import { Transaction } from 'sequelize/types'
// import { send, template } from '@mailer'
// import { FormattedOption } from '@action/OptionAction'
// import sequelize from '@database'
// import { MailConfirmAttributes } from '@mailer/template/MailConfirm'

// /**
//  * 发送激活邮件
//  * @param { User } user
//  * @param { Transaction } t?
//  */
// const Activate = async (user: User, t?: Transaction): Promise<Restful> => {
//   t = t || (await sequelize.transaction())
//   try {
//     const { userName, userAccount, email } = user
//     const captcha = md5Crypto(
//       `${userAccount} - ${email} - ${Date.now().toString()}`,
//     ).slice(0, 8)
//     const existedMailCaptcha = await MailCaptchaAction.Retrieve(email)
//     const newCaptcha = MailCaptcha.build({ email, captcha })
//     if (!isUndef(existedMailCaptcha)) {
//       await MailCaptchaAction.Update(existedMailCaptcha, newCaptcha)
//     } else {
//       await MailCaptchaAction.Create(newCaptcha)
//     }
//     const rawOptions = await OptionAction.Retrieve__All()
//     const formattedOption: Partial<FormattedOption> = {}
//     rawOptions.forEach((v) => {
//       formattedOption[v.module][v.key] = v.value
//     })
//     const MailConfirmInfo: MailConfirmAttributes = {
//       title: `确认激活${formattedOption.system?.blogName as string}`,
//       accepter: { userName, email },
//       captcha: newCaptcha.captcha,
//     }
//     await send(
//       MailConfirmInfo.title,
//       await template.MailConfirm(MailConfirmInfo),
//       {
//         name: userName,
//         address: email,
//       },
//     )
//     await t.commit()
//     return new Restful(CodeDictionary.SUCCESS, '发送激活邮件成功')
//   } catch (e) {
//     await t.rollback()
//     return new Restful(
//       CodeDictionary.COMMON_ERROR,
//       `发送激活邮件失败, ${String(e.message)}`,
//     )
//   }
// }
// export default {}
