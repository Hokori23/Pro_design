/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'

import { debounce } from '@utils'
import OutputTemplate from './index'

const fsp = fs.promises
/**
 * @description 用于sass、scss热重载，输出文件为.html用于VSCode插件 -- Live Server预览
 */
const isTesting: boolean = true // Editable
let isWatching: boolean = false
/**
 * 测试函数
 * @param { string } outputFilePath
 * @param { Array<string>} watchFiles
 * @param { Function } callback
 */
const Test = async (outputFilePath: string, watchFiles: string[] = []) => {
  const user = {
    userName: 'testName',
    email: 'example@example.com',
  }
  const outputString = await OutputTemplate(
    {
      title: 'testTitle',
      accepter: user,
      subscribeUrl:
        'https://example.com/mail/subscribe-confirm?name=b8ea69d0573954a20348df29cb3f4539&address=e5d7416832a0084a6b8bbdaa57327adf',
    },
    true,
  )

  await fsp.writeFile(outputFilePath, outputString)
  console.log('Compiled Successfully')
  if (!isWatching) {
    watchFiles.forEach((file) => {
      const cb = debounce(async (filename: string) => {
        console.log(`${filename} just changed`)
        await Test(outputFilePath, watchFiles)
      }, 1000)
      fs.watch(file, (eventType, filename) => {
        cb(filename)
      })
    })
    isWatching = true
  }
}

/**
 * Test Here
 */
if (isTesting) {
  console.log('Start testing template')
  const outputFileName = 'test.html'
  const outputFilePath = path.resolve(__dirname, outputFileName)
  const watchFiles = [
    path.resolve(__dirname, 'template.ejs'),
    path.resolve(__dirname, 'template.scss'),
  ]
  // eslint-disable-next-line no-void
  void Test(outputFilePath, watchFiles)
}
