import { Post, PostComment, User } from '@models'
import { PostType } from '@models/Post'
// Op: https://www.sequelize.com.cn/core-concepts/model-querying-basics#%E5%BA%94%E7%94%A8-where-%E5%AD%90%E5%8F%A5
import { Op, Transaction } from 'sequelize'

/**
 * 添加帖子
 * @param { Post } post
 * @param { Transaction } t?
 */
const Create = async (post: Post, t?: Transaction): Promise<Post> => {
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
 * @param { boolean } showDrafts = false
 * @param { boolean } isHidden = false
 */
const Retrieve__ID = async (
  id: number,
  showDrafts: boolean = false,
  showHidden: boolean = false,
): Promise<Post | null> => {
  const where: any = {
    id,
  }
  if (!showDrafts) {
    where.isDraft = false
  }
  if (!showHidden) {
    where.isHidden = false
  }
  return await Post.findOne({
    include: [
      {
        association: 'tags',
      },
      {
        model: PostComment,
        as: 'postComments',
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
        separate: true,
        order: [['createdAt', 'ASC']],
      },
      {
        model: User,
        as: 'author',
        attributes: {
          exclude: ['password'],
        },
      },
    ],
    where,
  })
}

/**
 * 分页查询帖子
 * @param { number } offset
 * @param { number } limit
 * @param { PostType[] } postTypes = []
 * @param { boolean } showDrafts = false
 * @param { boolean } showHidden = false
 * @param { boolean } isASC = false // 升序
 */
const Retrieve__Page = async (
  offset: number,
  limit: number,
  postTypes: PostType[] = [],
  showDrafts: boolean = false,
  showHidden: boolean = false,
  isASC: boolean = false,
): Promise<Post[]> => {
  const where: any = {}
  if (!showDrafts) {
    where.isDraft = false
  }
  if (!showHidden) {
    where.isHidden = false
  }
  if (postTypes.length) {
    where[Op.or] = postTypes.map((value) => {
      return { type: value }
    })
  }
  return await Post.findAll({
    include: [
      {
        association: 'tags',
      },
      {
        model: PostComment,
        as: 'postComments',
      },
      {
        model: User,
        as: 'author',
      },
    ],
    where,
    offset,
    limit,
    order: [
      ['priority', 'DESC'],
      ['createdAt', isASC ? 'ASC' : 'DESC'],
    ],
  })
}

/**
 * 分页查询帖子（按标签）
 * @param { number } offset
 * @param { number } limit
 * @param { PostType[] } postTypes = []
 * @param { number[] } tids = []
 * @param { boolean } showDrafts = false
 * @param { boolean } showHidden = false
 * @param { boolean } isASC = false // 升序
 */
const Retrieve__Page_Tag = async (
  offset: number,
  limit: number,
  postTypes: PostType[] = [],
  tids: number[] = [],
  showDrafts: boolean = false,
  showHidden: boolean = false,
  isASC: boolean = false,
): Promise<Post[]> => {
  // 处理where对象
  const where: any = {}
  if (!showDrafts) {
    where.isDraft = false
  }
  if (!showHidden) {
    where.isHidden = false
  }
  if (tids.length) {
    where[Op.or] = tids.map((value) => {
      return { tid: value }
    })
  }
  if (postTypes.length) {
    where[Op.or] = where[Op.or].concat(
      postTypes.map((value) => {
        return { type: value }
      }),
    )
  }
  where.isDraft = false

  return await Post.findAll({
    include: [
      {
        association: 'tags',
      },
      {
        model: PostComment,
        as: 'postComments',
      },
      {
        model: User,
        as: 'author',
      },
    ],
    where,
    offset,
    limit,
    order: [
      ['isSticky', 'DESC'],
      ['createdAt', isASC ? 'ASC' : 'DESC'],
    ],
  })
}

const Count__Page = async (
  postTypes: PostType[] = [],
  showDrafts: boolean = false,
  showHidden: boolean = false,
): Promise<number> => {
  const where: any = {}
  if (postTypes.length) {
    where[Op.or] = postTypes.map((value) => {
      return { type: value }
    })
  }
  if (!showDrafts) {
    where.isDraft = false
  }
  if (!showHidden) {
    where.isHidden = false
  }
  return await Post.count({
    where,
  })
}

const Count__Page_Tag = async (
  postTypes: PostType[] = [],
  showDrafts: boolean = false,
  showHidden: boolean = false,
  tids: number[] = [],
): Promise<number> => {
  const where: any = {
    [Op.or]: tids.map((value) => {
      return { tid: value }
    }),
  }
  if (!showDrafts) {
    where.isDraft = false
  }
  if (!showHidden) {
    where.isHidden = false
  }
  if (postTypes.length) {
    where[Op.or] = where[Op.or].concat(
      postTypes.map((value) => {
        return { type: value }
      }),
    )
  }
  return await Post.count({
    where,
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
