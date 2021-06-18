import { Post, PostComment, User } from '@models'
import { Op, Transaction } from 'sequelize'

/**
 * 添加评论
 * @param { PostComment } comment
 * @param { Transaction } t?
 */
const Create = async (
  comment: PostComment,
  t?: Transaction,
): Promise<PostComment> => {
  return await comment.save({ transaction: t })
}

/**
 * 通过ID查询评论
 * @param id
 */
const Retrieve__ID = async (id: number): Promise<PostComment | null> => {
  return await PostComment.findOne({
    where: {
      id,
    },
  })
}

/**
 * 分页查询帖子
 * @param { number } offset
 * @param { number } limit
 * @param { boolean } isASC = false // 升序
 */
const Retrieve__Page = async (
  offset: number,
  limit: number,
  isASC: boolean = false,
): Promise<PostComment[]> => {
  return await PostComment.findAll({
    include: [
      {
        model: User,
        as: 'author',
        attributes: {
          exclude: ['password'],
        },
        required: false,
      },
      {
        model: Post,
        as: 'post',
      },
    ],
    offset,
    limit,
    order: [['createdAt', isASC ? 'ASC' : 'DESC']],
  })
}

/**
 * 通过PID查询评论
 * @param pid
 */
const Retrieve__PID = async (pid: number): Promise<PostComment[]> => {
  return await PostComment.findAll({
    where: {
      pid,
    },
    include: [
      {
        model: User,
        as: 'author',
        attributes: {
          exclude: ['password'],
        },
        required: false,
      },
    ],
    order: [['createdAt', 'ASC']],
  })
}

const Count__Page = async (): Promise<number> => {
  return await PostComment.count({})
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
          [Op.or]: {
            parentId: id,
            rootId: id,
          },
        },
      },
    },
  })
}

export default {
  Create,
  Retrieve__Page,
  Retrieve__ID,
  Retrieve__PID,
  Count__Page,
  Delete,
}
