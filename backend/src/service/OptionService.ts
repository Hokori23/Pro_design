import { OptionAction as Action } from 'action'
import { Option } from 'models'
import { Restful } from 'utils'
import { CodeDictionary } from '@const'
import sequelize from '@database'

/**
 * 保存设置
 * @param { Option[] } options
 */
const Save = async (options: Option[]): Promise<Restful> => {
  const t = await sequelize.transaction()
  try {
    await Action.Delete__All(t)
    options = await Action.CreateBulk(options, t)
    await t.commit()
    return new Restful(CodeDictionary.SUCCESS, '保存设置成功')
  } catch (e) {
    await t.rollback()
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `保存设置失败, ${String(e.message)}`,
    )
  }
}

/**
 * 查询设置
 */
const Retrieve = async (): Promise<Restful> => {
  try {
    const options = await Action.Retrieve__All()
    return new Restful(CodeDictionary.SUCCESS, '查询设置成功', options)
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询设置失败, ${String(e.message)}`,
    )
  }
}
export default {
  Save,
  Retrieve,
}
