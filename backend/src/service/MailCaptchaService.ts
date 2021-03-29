import { MailCaptchaAction as Action, OptionAction, UserAction } from '@action'
import { MailCaptcha, User } from '@models'
import { isDef, isUndef, md5Crypto, Restful } from '@utils'
import { CodeDictionary } from '@const'
import { send, template } from '@mailer'
import { FormattedOption } from '@action/OptionAction'
import sequelize from '@database'
import { MailConfirmAttributes } from '@mailer/template/MailConfirm'
import { getBlogConfig } from '@mailer/template/utils'

/**
 * 发送激活邮件
 * @param { User } user
 */
const Activate = async (user: User): Promise<Restful> => {
  const t = await sequelize.transaction()
  try {
    const { userName, userAccount, email } = user
    const tasks: Array<Promise<any>> = [
      UserAction.Retrieve('userAccount', user.userAccount),
      UserAction.Retrieve('userName', user.userName),
      UserAction.Retrieve('email', user.email),
    ]
    const values = await Promise.all(tasks)
    if (values.filter((v) => isDef(v)).length) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__CAPTCHA_USER_EXISTED,
        '账号已存在',
      )
    }

    // 生成验证码
    const captcha = md5Crypto(
      `${userAccount} - ${email} - ${Date.now().toString()}`,
    ).slice(0, 8)

    const existedMailCaptcha = await Action.Retrieve(email)
    const newCaptcha = { email, captcha }
    if (isUndef(existedMailCaptcha)) {
      await Action.Create(MailCaptcha.build(newCaptcha), t)
    } else {
      await Action.Update(existedMailCaptcha, newCaptcha as MailCaptcha, t)
    }

    // 获取系统设置
    const rawOptions = await OptionAction.Retrieve__All()
    const formattedOption: Partial<FormattedOption> = {}
    rawOptions.forEach((v) => {
      if (isUndef(formattedOption[v.module])) formattedOption[v.module] = {}
      formattedOption[v.module][v.key] = v.value
    })
    const MailConfirmInfo: MailConfirmAttributes = {
      title: `确认激活邮箱 -- ${
        (formattedOption.system?.blogName as string) || '某博客'
      }`,
      accepter: { userName, email },
      captcha: newCaptcha.captcha,
      blogConfig: await getBlogConfig(),
    }

    // 发送邮件
    await send(
      MailConfirmInfo.title,
      await template.MailConfirm(MailConfirmInfo),
      {
        name: userName,
        address: email,
      },
    )
    await t.commit()
    return new Restful(CodeDictionary.SUCCESS, '发送激活邮件成功')
  } catch (e) {
    await t.rollback()
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `发送激活邮件失败, ${String(e.message)}`,
    )
  }
}
export default {
  Activate,
}
