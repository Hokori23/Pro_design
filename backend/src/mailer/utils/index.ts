import precss from 'precss'
import fs from 'fs'
import chalk from 'chalk'

const fsp = fs.promises
/**
 * @param { boolean } hotLoading = false
 * @description 使用precss编译scss, sass
 */
export const compilerStyleFile = async (
  importPath: string,
  outputPath: string,
  hotLoading: boolean = false,
  cssOutputString?: string,
): Promise<string> => {
  if (cssOutputString && !hotLoading) {
    // 若出现雪崩问题，可使用events.EventEmitter().once解决
    // 《深入浅出Node》Ch4.3 P77
    await fsp.writeFile(outputPath, cssOutputString)
    return cssOutputString
  }
  return precss
    .process(await fsp.readFile(importPath), {
      from: importPath,
    })
    .then(async (result) => {
      result.warnings().forEach((warn) => {
        // eslint-disable-next-line no-console
        console.log(chalk.yellow(warn.toString()))
      })
      await fsp.writeFile(outputPath, result.css)
      return result.css.replace(/[\r|\t|\n]/g, '')
    })
}
