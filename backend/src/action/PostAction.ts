import { Post, PostComment } from '@models'
import { PostType } from '@models/Post'
import { isUndef } from '@utils'

/**
 * 添加帖子
 * @param { Post } post
 */
const Create = async (post: Post) => {
  return await post.save()
}

/**
 * 删除帖子
 * @param { number } id
 */
const Delete = async (id: number): Promise<number> => {
  return await Post.destroy({
    where: {
      id,
    },
  })
}

/**
 * 编辑帖子信息
 * @param { Post } oldPost
 * @param { Post } newPost
 */
const Update = async (oldPost: Post, newPost: Post): Promise<Post> => {
  return await Object.assign(oldPost, newPost).save()
}

/**
 * 通过ID查询某个帖子
 * @param { number } id
 */
const Retrieve__ID = async (id: number): Promise<Post | null> => {
  return await Post.findOne({
    include: [
      {
        association: 'tags',
      },
      PostComment,
    ],
    where: {
      id,
    },
  })
}

/**
 * 分页查询帖子
 * @param { number } offset
 * @param { number } limit
 * @param { PostType } postType
 * @param { boolean } isASC // 升序
 */
const Retrieve__Page = async (
  offset: number,
  limit: number,
  postType?: PostType,
  isASC: boolean = false,
): Promise<Post[]> => {
  return await Post.findAll({
    include: [
      {
        association: 'tags',
      },
    ],
    where: isUndef(postType)
      ? undefined
      : {
          postType,
        },
    offset,
    limit,
    order: [
      ['isSticky', 'DESC'],
      ['createdAt', isASC ? 'ASC' : 'DESC'],
    ],
  })
}

/**
 * 分页查询帖子（按标签）
 * @param { number } offset
 * @param { number } limit
 * @param { number } tid
 * @param { PostType } postType
 * @param { boolean } isASC // 升序
 */
const Retrieve__Page__Tag = async (
  offset: number,
  limit: number,
  tid: number,
  postType?: PostType,
  isASC: boolean = false,
): Promise<Post[]> => {
  return await Post.findAll({
    include: [
      {
        association: 'tags',
        where: {
          tid: tid,
        },
      },
    ],
    where: isUndef(postType)
      ? undefined
      : {
          postType,
        },
    offset,
    limit,
    order: [
      ['isSticky', 'DESC'],
      ['createdAt', isASC ? 'ASC' : 'DESC'],
    ],
  })
}

export default {
  Create,
  Delete,
  Update,
  Retrieve__ID,
  Retrieve__Page,
  Retrieve__Page__Tag,
}
