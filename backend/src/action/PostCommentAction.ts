import { PostComment } from '@models'

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
 */
const Delete = async (id: number): Promise<number> => {
  return await PostComment.destroy({
    where: {
      id,
    },
  })
}

export default {
  Create,
  Retrieve__ID,
  Delete,
}
