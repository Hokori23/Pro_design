import { PostComment } from '@models'

/**
 * 添加评论
 * @param { PostComment } comment
 */
const Create = async (comment: PostComment) => {
  return await comment.save()
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
  Delete,
}
