/* eslint-disable no-console */
import miment from 'miment'
import chalk from 'chalk'
export default (req, res, next) => {
  const isWhiteRoute = req.auth?.id
  console.log(
    isWhiteRoute
      ? chalk.red('=======================>')
      : chalk.cyan('=======================>'),
  )
  console.log(`${chalk.green('PATH:')} ${req.path as string}`)
  console.log(
    `${chalk.green('User-Agent:')} ${req.headers['user-agent'] as string}`,
  )
  console.log(
    `${chalk.green('IP:')} ${req.ip as string} [${
      req.ips.join(', ') as string
    }]`,
  )
  if (isWhiteRoute) {
    console.log(`${chalk.green('USER_NAME')} ${req.auth.userName as string}`)
    console.log(
      `${chalk.green('USER_ACCOUNT')} ${req.auth.userAccount as string}`,
    )
  }

  console.log(
    `${chalk.green('Request-Time:')} ${
      miment().format('YYYY-MM-DD hh:mm:ss') as string
    }`,
  )
  res.locals.ip = req.ip || req.ips[0]
  next()
  console.log(
    isWhiteRoute
      ? chalk.red('<=======================\n')
      : chalk.cyan('<=======================\n'),
  )
}
