/* eslint-disable no-void */
import path from 'path'
import fs from 'fs'
import { findSrcFiles, sassCompiler } from '@utils'
import chalk from 'chalk'

const fsp = fs.promises
export const compileAndOutput = async (inputPath: string, watch?: boolean) => {
  try {
    const outputPath = inputPath
      .replace(/\\backend\\src/, '\\backend\\build')
      .replace(/(scss|sass)$/, 'css')
    const cssOutputString = await sassCompiler(inputPath)
    await fsp.writeFile(outputPath, cssOutputString)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(chalk.red(e))
    !watch && process.exit(1)
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
