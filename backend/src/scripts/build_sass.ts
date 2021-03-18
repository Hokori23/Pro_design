/* eslint-disable no-void */
import path from 'path'
import fs from 'fs'
import { debounce, findSrcFiles, sassCompiler } from '@utils'
import chalk from 'chalk'

const fsp = fs.promises
const arg = process.argv[2]
export const compileAndOutput = async (inputPath: string) => {
  try {
    const outputPath = inputPath
      .replace(/\\backend\\src/, '\\backend\\build')
      .replace(/(scss|sass)$/, 'css')
    const cssOutputString = await sassCompiler(inputPath)
    await fsp.writeFile(outputPath, cssOutputString)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(chalk.red(e))
    process.exit(1)
  }
}
if (arg === 'w') {
  const sassFiles = findSrcFiles(
    path.resolve('./src/mailer/template'),
    [],
    /.*\.(sass|scss)$/,
  )
  let isWatching = false
  if (!isWatching) {
    // eslint-disable-next-line no-console
    console.log('Watching Sass files')
    sassFiles.forEach((file) => {
      const cb = debounce(async (filename: string) => {
        // eslint-disable-next-line no-console
        console.log(`${filename} just changed`)
        // eslint-disable-next-line no-void
        void compileAndOutput(file.path)
      }, 1000)
      fs.watch(file.path, (eventType, filename) => {
        cb(filename)
      })
    })
    isWatching = true
  }
}
export default () => {
  const sassFiles = findSrcFiles(
    path.resolve('./src/mailer/template'),
    [],
    /.*\.(sass|scss)$/,
  )
  sassFiles.forEach((file) => {
    void compileAndOutput(file.path)
  })
}
