import moment from 'moment'
import NodeMailer from 'nodemailer'
import chalk from 'chalk'
import config from '@config'
import template from './template'
import { isDev } from '@const'

const { emailConfig } = config

interface MailAccepter {
  name: string
  address: string
}

// 通用设置
const MAILER_OPTIONS = {
  secure: true,
  pool: true,
  maxConnections: 10,
  maxTryCount: 3,
  host: emailConfig.host,
  port: 465,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
}
// 发送者设置
const SENDER_OPTIONS = {
  from: {
    name: emailConfig.name,
    address: emailConfig.user,
  },
}

/**
 * @param { string } subject 邮件标题
 * @param { string } html 邮件模板
 * @param { Array<MailAccepter> } accepters 邮件接收者
 * @description 广播邮件
 */
const broadcast = async (
  subject: string,
  html: string,
  accepters: MailAccepter[],
) => {
  const promiseArr: Array<Promise<any>> = accepters.map(async (accepter) => {
    // 添加to, subject, HTML文本内容属性
    return await send(subject, html, accepter)
  })
  return await Promise.all(promiseArr)
}

/**
 * @param { string } subject 邮件标题
 * @param { string } html 通过邮件模板处理后生成的html字符串
 * @param { MailAccepter } accepter 接收人
 * @param { Number } count 失败次数
 * @param { Error } e
 * @description 发送单封邮件
 */
const send = async (
  subject: string,
  html: string,
  accepter: MailAccepter,
  count: number = 0,
  e = null,
): Promise<void> => {
  if (count > 0 && isDev)
    // eslint-disable-next-line no-console
    console.log(
      chalk.yellow(
        `${accepter.name} <${accepter.address}>: 第 ${count} 次尝试重发邮件...`,
      ),
    )

  const transporter = NodeMailer.createTransport(MAILER_OPTIONS)
  // 添加to, subject, HTML文本内容属性
  const sendOptions = { ...SENDER_OPTIONS, to: accepter, subject, html }
  try {
    await transporter.sendMail(sendOptions)
  } catch (e) {
    count++
    if (count >= MAILER_OPTIONS.maxTryCount) {
      isDev &&
        // eslint-disable-next-line no-console
        console.log(
          chalk.red(
            `邮件发送失败，时间：${moment().format('YYYY-MM-DD hh:mm:ss')}`,
          ),
        )
      throw new Error(String(e)) // TODO: 调用函数者需处理error
    } else {
      await send(subject, html, accepter, count, e)
    }
  }
}

export { broadcast, send, template }
export default {
  broadcast,
  send,
  template,
}
