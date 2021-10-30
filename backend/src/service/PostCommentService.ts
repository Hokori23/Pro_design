import { PostCommentAction as Action, PostAction, UserAction } from 'action'
import { User } from 'models'
import { PostCommentWithAuthor } from 'models/PostComment'
import { Restful, isUndef, isDef } from 'utils'
import { CodeDictionary } from '@const'
import { broadcastMails, BroadcastMailsAttribute, template } from '@mailer'
import { getBlogConfig } from '@mailer/template/utils'
import sequelize from '@database'

/**
 * 发表评论
 * @param { PostComment } comment
 */
const Create = async (comment: PostCommentWithAuthor): Promise<Restful> => {
  const t = await sequelize.transaction()
  try {
    const existedPost = await PostAction.Retrieve__ID(comment.pid)
    if (isUndef(existedPost)) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__COMMENT_POST_NON_EXISTED,
        '该帖子已不存在',
      )
    }
    if (existedPost.isLocked) {
      return new Restful(
        CodeDictionary.SERVICE_ERROR__COMMENT_POST_IS_LOCKED,
        '该贴评论区已封锁',
      )
    }
    const isRegistered = isDef(comment.uid) && comment.uid !== 0
    let existedUser: User | null
    if (isRegistered) {
      existedUser = await UserAction.Retrieve('id', comment.uid)
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
      comment.uid = 0
    }

    // 添加帖子评论
    comment = await Action.Create(comment, t)

    // 判断是否有父评论
    if (isDef(comment.parentId) && isDef(comment.rootId)) {
      const parentComment = existedPost.postComments?.find(
        (v) => v.id === comment.parentId,
      )
      const rootComment = existedPost.postComments?.find(
        (v) => v.id === comment.rootId,
      )

      if (
        // 父评论或根评论不存在
        isUndef(parentComment) ||
        isUndef(rootComment)
      ) {
        return new Restful(
          CodeDictionary.SERVICE_ERROR__COMMENT_PARENT_COMMENT_NON_EXISTED,
          '回复评论不存在',
        )
      }
      // const siblingComments = existedPost.postComments?.filter(
      //   (v) => v.parentId === comment.parentId && v.email !== comment.email,
      // )
      const blogConfig = await getBlogConfig()
      const title = `你在 [${blogConfig.blogName}] 的评论有了新的回复！`

      // 设置评论名称，未注册则为邮箱
      const senderName =
        comment.uid === 0 ? comment.email : existedUser!.userName

      // const replyCommentSet = new Set()
      const replyComments =
        parentComment.email === comment.email // 判断回复的评论是不是自己的
          ? []
          : [parentComment]

      // 如果有需要发送回复邮件的评论
      if (replyComments?.length) {
        const attributes: BroadcastMailsAttribute[] = await Promise.all(
          replyComments.map(async (v) => {
            // 接受邮件人的userName
            const userName =
              v.uid === 0
                ? v.email
                : ((await UserAction.Retrieve('id', v.uid)) as User).userName
            return {
              subject: title,
              html: await template.NewComment({
                title,
                post: existedPost,
                accepter: {
                  userName,
                  email: v.email,
                },
                senderName,
                originComment: v.content,
                replyComment: comment.content,
                blogConfig,
              }),
              accepter: {
                name: userName,
                address: v.email,
              },
            }
          }),
        )
        await broadcastMails(attributes)
      }
    }

    await t.commit()
    return new Restful(CodeDictionary.SUCCESS, '发表评论成功', comment.toJSON())
  } catch (e: any) {
    await t.rollback()
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `发表评论失败, ${String(e.message)}`,
    )
  }
}

const Retrieve__PID = async (pid: number): Promise<Restful> => {
  try {
    const comments = await Action.Retrieve__PID(pid)
    return new Restful(CodeDictionary.SUCCESS, '查询成功', comments)
  } catch (e: any) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `查询评论失败, ${String(e.message)}`,
    )
  }
}

/**
 * 删除评论
 * @param { number } id
 */
const Delete = async (id: number): Promise<Restful> => {
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
  } catch (e: any) {
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
const Like = async (id: number): Promise<Restful> => {
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
  } catch (e: any) {
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
const Dislike = async (id: number): Promise<Restful> => {
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
  } catch (e: any) {
    return new Restful(
      CodeDictionary.COMMON_ERROR,
      `踩评论失败, ${String(e.message)}`,
    )
  }
}

export default {
  Create,
  Retrieve__PID,
  Delete,
  Like,
  Dislike,
}
