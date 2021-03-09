import { PostTagAssociation } from '@models'

/**
 * 添加帖子和标签的关系
 * @param { PostTagAssociation } association
 */
const Create = async (association: PostTagAssociation) => {
  return await association.save()
}

/**
 * 删除帖子和标签的关系
 * @param { number } id
 */
const Delete = async (id: number): Promise<number> => {
  return await PostTagAssociation.destroy({
    where: {
      id,
    },
  })
}

export default {
  Create,
  Delete,
}
