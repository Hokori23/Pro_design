import path from 'path'
import { findSrcFiles, File } from '@utils'
import chalk from 'chalk'
import { exec } from 'child_process'

export default (ejsFiles?: File[]) => {
  ejsFiles =
    ejsFiles || findSrcFiles(path.resolve('./src/mailer'), [], /.*\.ejs$/)
  ejsFiles.forEach((ejs) => {
    const outputPath = path.resolve(
      ejs.path.replace(
        path.join('backend', 'src'),
        path.join('backend', 'build'),
      ),
    )
    exec(`cp ${ejs.path} ${outputPath}`, (e) => {
      if (e) {
        // eslint-disable-next-line no-console
        console.log(chalk.red(e))
        process.exit(0)
      }
    })
  })
}
