/* eslint-disable no-console */
import miment from 'miment'
import chalk from 'chalk'
export default (req, res, next) => {
  console.log(chalk.cyan('=======================>'))
  console.log(`${chalk.green('PATH:')} ${req.path as string}`)
  console.log(
    `${chalk.green('User-Agent:')} ${req.headers['user-agent'] as string}`,
  )
  console.log(
    `${chalk.green('IP:')} ${req.ip as string} [${
      req.ips.join(', ') as string
    }]`,
  )
  console.log(
    `${chalk.green('Request-Time:')} ${
      miment().format('YYYY-MM-DD hh:mm:ss') as string
    }`,
  )
  next()
  console.log(chalk.cyan('<=======================\n'))
}
