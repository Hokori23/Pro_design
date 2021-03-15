import { PostCommentAction as Action, PostAction, UserAction } from 'action'
import { PostComment } from 'models'
import { Restful, isUndef } from 'utils'
import { CodeDictionary } from '@const'

/**
 * 发表评论
 * @param { PostComment } comment
 */
const Create = async (comment: PostComment): Promise<Restful> => {
  try {
    const existedPost = await PostAction.Retrieve__ID(comment.pid)
    if (isUndef(existedPost)) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__COMMENT_POST_NON_EXISTED,
        '该帖子已不存在',
      )
    }

    // 判断是否为父评论
    const isParentComment = !isUndef(comment.parentId)
    if (isParentComment) {
      if (
        // 父评论不存在
        existedPost.postComments?.every((v) => v.id !== comment.parentId)
      ) {
        return new Restful(
          CodeDictionary.SERVICE_ERROR__COMMENT_PARENT_COMMENT_NON_EXISTED,
          '回复评论不存在',
        )
      }
      // TODO: 发送邮件给父评论用户(若非自己)
    }
    const isRegistered = !isUndef(comment.uid) && comment.uid !== -1

    if (isRegistered) {
      const existedUser = await UserAction.Retrieve('id', comment.uid)
      if (isUndef(existedUser)) {
        return new Restful(
          CodeDictionary.SERVICE_ERROR__COMMENT_USER_NON_EXISTED,
          '当前评论使用的账号不存在',
        )
      }
      const { email } = existedUser
      comment.email = email
    } else if (isUndef(comment.email)) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__COMMENT_EMAIL_NEEDED,
        '评论需要email',
      )
    } else {
      comment.uid = -1
    }

    // 添加帖子评论
    comment = await Action.Create(comment)

    return new Restful(CodeDictionary.SUCCESS, '发表评论成功', comment.toJSON())
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `发表评论失败, ${String(e.message)}`,
    )
  }
}

/**
 * 删除评论
 * @param { number } id
 */
const Delete = async (id: number) => {
  try {
    const existedComment = await Action.Retrieve__ID(id)
    if (isUndef(existedComment)) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__COMMENT_NON_EXISTED,
        '此评论已不存在',
      )
    }
    const deleteRow = await Action.Delete(id, existedComment.pid)
    return deleteRow > 0
      ? new Restful(CodeDictionary.SUCCESS, '删除评论成功')
      : new Restful(CodeDictionary.DELETE_ERROR__COMMENT, '删除评论失败')
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `删除评论失败, ${String(e.message)}`,
    )
  }
}

/**
 * 点赞评论
 * @param { number } id
 */
const Like = async (id: number) => {
  try {
    const existedComment = await Action.Retrieve__ID(id)
    if (isUndef(existedComment)) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__COMMENT_NON_EXISTED,
        '此评论已不存在',
      )
    }
    await existedComment.increment('likesCount')
    return new Restful(CodeDictionary.SUCCESS, '点赞成功')
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `点赞评论失败, ${String(e.message)}`,
    )
  }
}

/**
 * 踩评论
 * @param { number } id
 */
const Dislike = async (id: number) => {
  try {
    const existedComment = await Action.Retrieve__ID(id)
    if (isUndef(existedComment)) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__COMMENT_NON_EXISTED,
        '此评论已不存在',
      )
    }
    await existedComment.increment('dislikesCount')
    return new Restful(CodeDictionary.SUCCESS, '踩成功')
  } catch (e) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `踩评论失败, ${String(e.message)}`,
    )
  }
}

export default {
  Create,
  Delete,
  Like,
  Dislike,
}
