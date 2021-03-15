import { PostAction as Action, PostTagAssociationAction } from 'action'
import { Post } from 'models'
import { Restful, isUndef, isDef } from 'utils'
import { CodeDictionary } from '@const'
import { PostType } from '@models/Post'
import database from '@database'
/**
 * 添加帖子
 * @param { Post } post
 */
const Create = async (post: Post, tids?: number[]): Promise<Restful> => {
  // Sequelize事务: https://www.sequelize.com.cn/other-topics/transactions
  // 创建事务
  const t = await database.transaction()
  try {
    // 除了说说以外都需要title
    if (post.type !== PostType.MOMENT && !post.title) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__POST_NEED_TITLE,
        '除说说以外的文章类型，标题是必需的',
      )
    }
    post = await Action.Create(post, t)
    // 如果帖子有标签
    tids = tids?.filter((tid) => isDef(tid))
    if (tids?.length) {
      await PostTagAssociationAction.CreateBulk(
        tids.map((tid) => ({ pid: post.id, tid })),
        t,
      )
    }
    // 提交事务
    await t.commit()
    await post.reload()
    return new Restful(CodeDictionary.SUCCESS, '添加帖子成功', post.toJSON())
  } catch (e) {
    // 回退事务
    await t.rollback()
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `添加帖子失败, ${String(e.message)}`,
    )
  }
}

/**
 * 通过id查询某个帖子
 * @param { number } id
 */
const Retrieve__ID = async (id: number): Promise<Restful> => {
  try {
    const post = await Action.Retrieve__ID(id)
    if (isUndef(post)) {
      return new Restful(
        CodeDictionary.RETRIEVE_ERROR__POST_NON_EXISTED,
        '帖子不存在',
      )
    }
    return new Restful(CodeDictionary.SUCCESS, '查询成功', post.toJSON())
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询失败, ${String(e.message)}`,
    )
  }
}

/**
 * 按页查询（公开接口）
 * @param { string } page
 * @param { string } capacity
 * @param { PostType } postType?
 * @param { string } isASC?
 */
const Retrieve__Page = async (
  page: string,
  capacity: string,
  postType?: PostType,
  isASC: string = 'false',
): Promise<Restful> => {
  try {
    const values = await Promise.all([
      Action.Retrieve__Page(
        (Number(page) - 1) * Number(capacity),
        Number(capacity),
        postType,
        isASC === 'true',
      ),
      Action.Count__Page(postType),
    ])
    const result = {
      posts: values[0],
      count: values[1],
    }
    return new Restful(CodeDictionary.SUCCESS, '查询成功', result)
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询失败, ${String(e.message)}`,
    )
  }
}

/**
 * 按标签和页查询（公开接口）
 * @param { string } page
 * @param { string } capacity
 * @param { string[] } tids
 * @param { PostType } postType?
 * @param { string } isASC?
 */
const Retrieve__Page_Tag = async (
  page: string,
  capacity: string,
  tids: string[],
  postType?: PostType,
  isASC: string = 'false',
): Promise<Restful> => {
  try {
    const values = await Promise.all([
      Action.Retrieve__Page_Tag(
        (Number(page) - 1) * Number(capacity),
        Number(capacity),
        postType,
        tids.map((tid) => Number(tid)),
        isASC === 'true',
      ),
      Action.Count__Page_Tag(
        postType,
        tids.map((tid) => Number(tid)),
      ),
    ])
    const result = {
      posts: values[0],
      count: values[1],
    }
    return new Restful(CodeDictionary.SUCCESS, '查询成功', result)
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询失败, ${String(e.message)}`,
    )
  }
}

/**
 * 编辑帖子
 * @param { any } post
 * @param { number[] } tids
 */
const Edit = async (post: any, tids: number[]): Promise<Restful> => {
  const t = await database.transaction()
  try {
    const existedPost = await Action.Retrieve__ID(post.id as number)
    if (isUndef(existedPost)) {
      return new Restful(
        CodeDictionary.RETRIEVE_ERROR__POST_NON_EXISTED,
        '帖子不存在',
      )
    }
    const tagTransaction = new Promise<any>((resolve, reject) => {
      // 先删除该帖子上的所有标签关联
      // 然后再创建
      PostTagAssociationAction.DeleteBulk(post.id as number)
        .then(() => {
          tids = tids.filter((tid) => isDef(tid))
          if (tids.length) {
            return PostTagAssociationAction.CreateBulk(
              tids.map((tid) => ({ pid: post.id, tid })),
              t,
            )
          }
        })
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
    const values = await Promise.all([
      Action.Update(existedPost, post, t),
      tagTransaction,
    ] as any[])
    const newPost = values[0]
    await t.commit()
    return new Restful(CodeDictionary.SUCCESS, '编辑成功', newPost.toJSON())
  } catch (e) {
    await t.rollback()
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `编辑失败, ${String(e.message)}`,
    )
  }
}

/**
 * 删除帖子（公开接口）
 * @description 不能删除非自己的帖子
 * @param { string } id
 * @param { string } uid
 */
const Delete = async (id: string, uid: string): Promise<Restful> => {
  try {
    const existedPost = await Action.Retrieve__ID(Number(id))
    if (isUndef(existedPost)) {
      return new Restful(
        CodeDictionary.RETRIEVE_ERROR__POST_NON_EXISTED,
        '帖子不存在',
      )
    }
    if (existedPost.uid !== Number(uid)) {
      return new Restful(
        CodeDictionary.DELETE_ERROR__POST_NO_PERMISSION,
        '不能删除他人帖子',
      )
    }
    const deleteRow = await Action.Delete(Number(id))
    return deleteRow > 0
      ? new Restful(CodeDictionary.SUCCESS, `删除帖子成功`)
      : new Restful(CodeDictionary.DELETE_ERROR__POST, `删除帖子失败`)
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `删除帖子失败, ${String(e.message)}`,
    )
  }
}

/**
 * 删除帖子（管理员接口）
 * @param { string } id
 * @param { string } uid
 */
const Delete__Admin = async (id: string): Promise<Restful> => {
  try {
    const existedPost = await Action.Retrieve__ID(Number(id))
    if (isUndef(existedPost)) {
      return new Restful(
        CodeDictionary.RETRIEVE_ERROR__POST_NON_EXISTED,
        '帖子不存在',
      )
    }
    const deleteRow = await Action.Delete(Number(id))
    return deleteRow > 0
      ? new Restful(CodeDictionary.SUCCESS, `删除帖子成功`)
      : new Restful(CodeDictionary.DELETE_ERROR__POST, `删除帖子失败`)
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `删除帖子失败, ${String(e.message)}`,
    )
  }
}

/**
 * 点赞帖子
 * @param { number } id
 */
const Like = async (id: number): Promise<Restful> => {
  try {
    const existedPost = await Action.Retrieve__ID(id)
    if (isUndef(existedPost)) {
      return new Restful(
        CodeDictionary.RETRIEVE_ERROR__POST_NON_EXISTED,
        '此帖子已不存在',
      )
    }
    await existedPost.increment('likesCount')
    return new Restful(CodeDictionary.SUCCESS, '点赞成功')
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `点赞帖子失败, ${String(e.message)}`,
    )
  }
}

/**
 * 踩帖子
 * @param { number } id
 */
const Dislike = async (id: number): Promise<Restful> => {
  try {
    const existedPost = await Action.Retrieve__ID(id)
    if (isUndef(existedPost)) {
      return new Restful(
        CodeDictionary.RETRIEVE_ERROR__POST_NON_EXISTED,
        '此帖子已不存在',
      )
    }
    await existedPost.increment('dislikesCount')
    return new Restful(CodeDictionary.SUCCESS, '踩成功')
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `踩帖子失败, ${String(e.message)}`,
    )
  }
}

export default {
  Create,
  Retrieve__ID,
  Retrieve__Page,
  Retrieve__Page_Tag,
  Edit,
  Delete,
  Delete__Admin,
  Like,
  Dislike,
}
