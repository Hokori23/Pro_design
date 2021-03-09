import { PostTagAssociation } from '@models'
import { Transaction } from 'sequelize/types'

/**
 * 添加帖子和标签的关系
 * @param { PostTagAssociation } association
 */
const Create = async (association: PostTagAssociation) => {
  return await association.save()
}

/**
 * 批量添加帖子和标签的关系
 * @param { any[] } arr
 */
const CreateBulk = async (arr: any[], t?: Transaction) => {
  return await PostTagAssociation.bulkCreate(arr, {
    validate: true,
    transaction: t,
  })
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
  CreateBulk,
  Delete,
}
