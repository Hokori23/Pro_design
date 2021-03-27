/* eslint-disable no-console */
/* eslint-disable no-void */
import path from 'path'
import fs from 'fs'
import { debounce, findSrcFiles } from '@utils'
import copyEjs from './copy_ejs'
import { compileAndOutput } from './build_sass'
const arg = process.argv[2]

if (arg === 'w') {
  const sassFiles = findSrcFiles(
    path.resolve('./src/mailer/template'),
    [],
    /.*\.(sass|scss)$/,
  )
  const ejsFiles = findSrcFiles(
    path.resolve('./src/mailer/template'),
    [],
    /.*\.(ejs)$/,
  )
  let isWatching = false
  if (!isWatching) {
    console.log('Watching sass files')
    try {
      sassFiles.forEach((file) => {
        const cb = debounce(async (filename: string) => {
          console.log(`${filename} just changed`)
          void compileAndOutput(file.path, true)
        }, 1000)
        fs.watch(file.path, (eventType, filename) => {
          cb(filename)
        })
      })
      console.log('Watching ejs files')
      ejsFiles.forEach((file) => {
        const cb = debounce(async (filename: string) => {
          console.log(`${filename} just changed`)
          void copyEjs([{ path: file.path, name: filename }])
        }, 1000)
        fs.watch(file.path, (eventType, filename) => {
          cb(filename)
        })
      })
    } catch (error) {
      console.log(error)
    }
    isWatching = true
  }
}
