import { PostTagAction as Action } from 'action'
import { PostTag } from 'models'
import { Restful, isUndef, isDef } from 'utils'
import { CodeDictionary } from '@const'

/**
 * 创建标签
 * @param { PostTag } tag
 */
const Create = async (tag: PostTag): Promise<Restful> => {
  try {
    const tasks: Array<Promise<any>> = [
      Action.Retrieve('name', tag.name),
      Action.Retrieve('slug', tag.slug),
    ]
    const values = await Promise.all(tasks)
    if (isDef(values[0])) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__TAG_EXISTED,
        '已存在同名标签',
      )
    }
    if (isDef(values[1])) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__TAG_EXISTED,
        '已存在相同slug的标签',
      )
    }
    tag = await Action.Create(tag)
    return new Restful(CodeDictionary.SUCCESS, '创建标签成功', tag.toJSON())
  } catch (e: any) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `创建标签失败, ${String(e.message)}`,
    )
  }
}

/**
 * 通过slug查询标签
 */
const Retrieve__Slug = async (slug: string): Promise<Restful> => {
  try {
    const tag = await Action.Retrieve('slug', slug)
    if (isUndef(tag)) {
      return new Restful(
        CodeDictionary.RETRIEVE_ERROR__POST_NON_EXISTED,
        '标签不存在',
      )
    }
    return new Restful(CodeDictionary.SUCCESS, '查询成功', tag)
  } catch (e: any) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询失败, ${String(e.message)}`,
    )
  }
}

/**
 * 查询所有标签
 */
const Retrieve__All = async (): Promise<Restful> => {
  try {
    const tags = await Action.Retrieve__All()
    return new Restful(CodeDictionary.SUCCESS, '查询成功', tags)
  } catch (e: any) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询失败, ${String(e.message)}`,
    )
  }
}

/**
 * 编辑标签
 * @param { PostTag } tag
 */
const Edit = async (tag: PostTag): Promise<Restful> => {
  try {
    const tasks: Array<Promise<any>> = [
      Action.Retrieve__Exclude__ID('name', tag.name, tag.id as number),
      Action.Retrieve__Exclude__ID('slug', tag.slug, tag.id as number),
    ]
    const values = await Promise.all(tasks)
    if (isDef(values[0])) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__TAG_EXISTED,
        '已存在同名标签',
      )
    }
    if (isDef(values[1])) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__TAG_EXISTED,
        '已存在相同slug的标签',
      )
    }
    const existedTag = await Action.Retrieve('id', tag.id as number)
    if (isUndef(existedTag)) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__TAG_NON_EXISTED,
        '此标签已不存在',
      )
    }
    tag = await Action.Update(existedTag, tag)
    return new Restful(CodeDictionary.SUCCESS, '编辑标签成功', tag.toJSON())
  } catch (e: any) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `编辑标签失败, ${String(e.message)}`,
    )
  }
}

/**
 * 删除标签
 * @param { number } id
 */
const Delete = async (id: number): Promise<Restful> => {
  try {
    const existedTag = await Action.Retrieve('id', id)
    if (isUndef(existedTag)) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__TAG_NON_EXISTED,
        '此标签已不存在',
      )
    }
    const deleteRow = await Action.Delete(id)
    return deleteRow > 0
      ? new Restful(CodeDictionary.SUCCESS, '删除标签成功')
      : new Restful(CodeDictionary.DELETE_ERROR__COMMENT, '删除标签失败')
  } catch (e: any) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `删除标签失败, ${String(e.message)}`,
    )
  }
}

export default {
  Create,
  Retrieve__Slug,
  Retrieve__All,
  Edit,
  Delete,
}
