import { PostTag } from '@models'

/**
 * 添加标签
 * @param { PostTag } postTag
 */
const Create = async (postTag: PostTag) => {
  return await postTag.save()
}

/**
 * 删除标签
 * @param { number } id
 */
const Delete = async (id: number): Promise<number> => {
  return await PostTag.destroy({
    where: {
      id,
    },
  })
}

/**
 * 编辑标签信息
 * @param { PostTag } oldTag
 * @param { PostTag } newTag
 */
const Update = async (oldTag: PostTag, newTag: PostTag): Promise<PostTag> => {
  return await Object.assign(oldTag, newTag).save()
}

/**
 * 通过某个字段查询标签
 * @param { string } param
 * @param { string } value
 */
const Retrieve = async (
  key: string,
  value: string | number,
): Promise<PostTag | null> => {
  return await PostTag.findOne({
    where: {
      [`${key}`]: value,
    },
  })
}

/**
 * 查询所有标签
 */
const Retrieve__All = async (): Promise<PostTag[]> => {
  return await PostTag.findAll()
}

/**
 * 分页查询标签
 * @param { number } offset
 * @param { number } limit
 * @param { boolean } isASC // 升序
 */
const Retrieve__Page = async (
  offset: number,
  limit: number,
  isASC: boolean = false,
): Promise<PostTag[]> => {
  return await PostTag.findAll({
    offset,
    limit,
    order: ['createdAt', isASC ? 'ASC' : 'DESC'],
  })
}

const Count__Page = async () => {
  return await PostTag.count()
}

export default {
  Create,
  Delete,
  Update,
  Retrieve,
  Retrieve__All,
  Retrieve__Page,
  Count__Page,
}
