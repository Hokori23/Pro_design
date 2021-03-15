import { PostComment } from '@models'
import { Op } from 'sequelize'

/**
 * 添加评论
 * @param { PostComment } comment
 */
const Create = async (comment: PostComment) => {
  return await comment.save()
}

/**
 * 通过ID查询评论
 * @param id
 */
const Retrieve__ID = async (id: number) => {
  return await PostComment.findOne({
    where: {
      id,
    },
  })
}

/**
 * 删除评论
 * @param { number } id
 * @param { number } pid?
 */
const Delete = async (id: number, pid?: number): Promise<number> => {
  return await PostComment.destroy({
    where: {
      [Op.or]: {
        id,
        [Op.and]: {
          pid,
          parentId: id,
        },
      },
    },
  })
}

export default {
  Create,
  Retrieve__ID,
  Delete,
}
