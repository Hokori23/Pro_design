import React, { FC, Fragment } from 'react'
import { FormattedPostComment, PostComment } from '@/utils/Request/PostComment'
import { isUndef } from '@/utils/tools'
import _ from 'lodash'

// components
import { NewComment } from './NewComment'
import { RootComment } from './RootComment'

const useFormatComment = (
  _postComments?: PostComment[],
): FormattedPostComment[] | null => {
  if (isUndef(_postComments)) return null
  const postComments: FormattedPostComment[] = _.cloneDeep(_postComments)

  const rootComments: FormattedPostComment[] = []
  const childComments: FormattedPostComment[] = []

  for (let i = 0; i < postComments.length; i++) {
    const comment = postComments[i]
    if (comment.rootId) {
      // 子评论
      comment.children = []
      childComments.push(comment)
    } else {
      // 根评论
      comment.children = []
      rootComments.push(comment)
    }
  }

  for (let i = 0; i < childComments.length; i++) {
    const childComment = childComments[i]
    const rootComment = rootComments.find(
      (comment) => comment.id === childComment.rootId,
    )
    rootComment?.children?.push(childComment)
  }

  for (let i = 0; i < childComments.length; i++) {
    const childComment = childComments[i]
    const parentComment = childComments.find(
      (comment) => comment.id === childComment.parentId,
    )
    childComment.parent = parentComment
  }

  return rootComments
}

interface CommentProps {
  postComments?: PostComment[]
  isMobileSize: boolean
}

export const Comment: FC<CommentProps> = ({ postComments, isMobileSize }) => {
  const formattedPostComment = useFormatComment(postComments)
  return (
    <Fragment>
      <NewComment />
      {formattedPostComment?.map((comment) => (
        <RootComment
          comment={comment}
          isMobileSize={isMobileSize}
          key={comment.id}
        />
      ))}
    </Fragment>
  )
}
