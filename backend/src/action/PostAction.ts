import { Post, PostComment } from '@models'
import { PostType } from '@models/Post'
import { isUndef } from '@utils'
// Op: https://www.sequelize.com.cn/core-concepts/model-querying-basics#%E5%BA%94%E7%94%A8-where-%E5%AD%90%E5%8F%A5
import { Op, Transaction } from 'sequelize'

/**
 * 添加帖子
 * @param { Post } post
 * @param { Transaction } t?
 */
const Create = async (post: Post, t?: Transaction) => {
  return await post.save({ transaction: t })
}

/**
 * 编辑帖子信息
 * @param { Post } oldPost
 * @param { Post } newPost
 * @param { Transaction } t?
 */
const Update = async (
  oldPost: Post,
  newPost: Post,
  t?: Transaction,
): Promise<Post> => {
  return await Object.assign(oldPost, newPost).save({ transaction: t })
}

/**
 * 通过ID查询某个帖子
 * @param { number } id
 * @param { boolean } showDrafts?
 */
const Retrieve__ID = async (
  id: number,
  showDrafts: boolean = false,
): Promise<Post | null> => {
  return await Post.findOne({
    include: [
      {
        association: 'tags',
      },
      PostComment,
    ],
    where: {
      id,
      isDraft: showDrafts,
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
 * @param { number[] } tid
 * @param { PostType } postType
 * @param { boolean } isASC // 升序
 */
const Retrieve__Page_Tag = async (
  offset: number,
  limit: number,
  postType?: PostType,
  tids: number[] = [],
  isASC: boolean = false,
): Promise<Post[]> => {
  // 处理where对象
  const where = {}
  if (tids.length)
    where[Op.or] = tids.map((value) => {
      return { tid: value }
    })
  if (!isUndef(postType)) where[postType] = postType

  return await Post.findAll({
    include: [
      {
        association: 'tags',
      },
    ],
    where: where,
    offset,
    limit,
    order: [
      ['isSticky', 'DESC'],
      ['createdAt', isASC ? 'ASC' : 'DESC'],
    ],
  })
}

const Count__Page = async (postType?: PostType) => {
  return await Post.count({
    where: isUndef(postType)
      ? undefined
      : {
          postType,
        },
  })
}

const Count__Page_Tag = async (postType?: PostType, tids: number[] = []) => {
  return await Post.count({
    where: isUndef(postType)
      ? {
          [Op.or]: tids.map((value) => {
            return { tid: value }
          }),
        }
      : {
          postType,
          [Op.or]: tids.map((value) => {
            return { tid: value }
          }),
        },
  })
}

/**
 * 删除帖子
 * @param { number } id
 * @param { Transaction } t?
 */
const Delete = async (id: number, t?: Transaction): Promise<number> => {
  return await Post.destroy({
    where: {
      id,
    },
    transaction: t,
  })
}

export default {
  Create,
  Update,
  Retrieve__ID,
  Retrieve__Page,
  Retrieve__Page_Tag,
  Count__Page,
  Count__Page_Tag,
  Delete,
}
