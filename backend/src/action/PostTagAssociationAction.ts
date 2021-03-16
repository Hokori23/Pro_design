import { PostTagAssociation } from '@models'
import { Transaction } from 'sequelize/types'

/**
 * 添加帖子和标签的关系
 * @param { PostTagAssociation } association
 */
const Create = async (
  association: PostTagAssociation,
): Promise<PostTagAssociation> => {
  return await association.save()
}

/**
 * 批量添加帖子和标签的关系
 * @param { any[] } arr
 * @param { Transaction } t?
 */
const CreateBulk = async (
  arr: any[],
  t?: Transaction,
): Promise<PostTagAssociation[]> => {
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

/**
 * 批量删除帖子和标签的关系
 * @param { number } pid
 * @param { Transaction } t?
 */
const DeleteBulk = async (pid: number, t?: Transaction): Promise<number> => {
  return await PostTagAssociation.destroy({
    where: {
      pid,
    },
    transaction: t,
  })
}

export default {
  Create,
  CreateBulk,
  Delete,
  DeleteBulk,
}
