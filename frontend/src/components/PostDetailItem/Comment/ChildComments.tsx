import React, { FC, useEffect, useState } from 'react'
import { FormattedPostComment } from '@/utils/Request/PostComment'
import {
  IconButton,
  Avatar,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core'
import classnames from 'classnames'
import Request from '@/utils/Request'
import moment from 'moment'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import { red } from '@material-ui/core/colors'
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
  childComment: {
    display: 'flex',
    paddingBottom: 10,
    '&:first-child': {
      paddingTop: 10,
    },
  },
  childCommentBox: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    '& > div': {
      display: 'flex',
    },
  },
  childCommentAvatar: {
    '& .MuiAvatar-root': {
      width: 24,
      height: 24,
    },
    width: 24,
    height: 24,
    padding: 0,
    marginRight: 11,
  },
  childCommentAuthorName: {
    fontWeight: 600,
    textTransform: 'inherit',
    letterSpacing: '0.08333em',
    marginRight: 8,
  },
  childCommentText: {
    wordBreak: 'break-word',
  },
  childCommentReply: {
    display: 'inline-block',
    marginRight: 5,
  },
  childCommentFooter: {
    display: 'flex',
    alignItems: 'center',
  },
  childCommentAction: {
    display: 'flex',
    justifySelf: 'flex-end',
    marginLeft: 10,
    '& .MuiButtonBase-root.MuiIconButton-root': {
      padding: 3,
    },
  },
  childCommentActionItem: {
    marginRight: 10,
  },
  Icon: {
    fontSize: 18,
  },
  replyButton: {
    marginLeft: 5,
    minWidth: 40,
    [theme.breakpoints.up(700)]: {
      minWidth: 50,
    },
  },
}))

interface ChildCommentsProps {
  rootComment: FormattedPostComment
  isMobileSize: boolean
  handleDisplayReplyBox: (parent?: FormattedPostComment) => void
}
interface PostCommentWithStatus extends FormattedPostComment {
  liked: boolean
  disliked: boolean
}

export const ChildComments: FC<ChildCommentsProps> = ({
  rootComment,
  isMobileSize,
  handleDisplayReplyBox,
}) => {
  const rawChildComments = (rootComment.children as PostCommentWithStatus[])!.map(
    (comment) => {
      comment.liked = comment.disliked = false
      return comment
    },
  )
  const [childComments, setChildComments] = useState(rawChildComments)

  const classes = useStyles()

  const Like = async (comment: PostCommentWithStatus, idx: number) => {
    const res = await Request.PostComment.Like(comment.id)
    if (res && res?.code === 0) {
      const cloneChildComments = _.cloneDeep(childComments)
      cloneChildComments[idx].likesCount++
      cloneChildComments[idx].liked = true
      setChildComments(cloneChildComments)
    }
  }
  const Dislike = async (comment: PostCommentWithStatus, idx: number) => {
    const res = await Request.PostComment.Dislike(comment.id)
    if (res && res?.code === 0) {
      const cloneChildComments = _.cloneDeep(childComments)
      cloneChildComments[idx].dislikesCount++
      cloneChildComments[idx].disliked = true
      setChildComments(cloneChildComments)
    }
  }
  useEffect(() => {
    const rawChildComments = (rootComment.children as PostCommentWithStatus[])!.map(
      (comment) => {
        comment.liked = comment.disliked = false
        return comment
      },
    )
    setChildComments(rawChildComments)
  }, [rootComment])

  return (
    <section>
      {childComments?.map((comment, idx) => {
        const {
          id,
          author,
          parent,
          email,
          content,
          likesCount,
          dislikesCount,
          liked,
          disliked,
          createdAt,
        } = comment
        return (
          <div className={classes.childComment} key={id}>
            <IconButton className={classes.childCommentAvatar} color="primary">
              <Avatar alt={author?.userName || email} src={author?.avatarUrl} />
            </IconButton>
            <div className={classes.childCommentBox}>
              <Typography component="div">
                <Typography
                  className={classes.childCommentAuthorName}
                  color="primary"
                  variant="caption"
                >
                  {author?.userName || email}
                </Typography>
                <Typography
                  className={classes.childCommentText}
                  component="span"
                  variant="body2"
                >
                  {parent?.author?.userName && (
                    <Typography
                      className={classnames(
                        classes.childCommentReply,
                        classes.childCommentText,
                      )}
                      component="div"
                      variant="body2"
                    >
                      回复
                      <Typography
                        className={classes.childCommentAuthorName}
                        color="primary"
                        style={{ marginRight: 0 }}
                        variant="caption"
                      >
                        @{parent?.author?.userName}
                      </Typography>
                      ：
                    </Typography>
                  )}
                  {content}
                </Typography>
              </Typography>
              <footer className={classes.childCommentFooter}>
                {/* CREATED_AT TIME */}
                <Typography color="textSecondary" variant="caption">
                  {moment(createdAt).format('lll')}
                </Typography>
                {/* ACTION */}
                {!isMobileSize && (
                  <Typography
                    className={classes.childCommentAction}
                    color="textSecondary"
                    variant="caption"
                  >
                    <div className={classes.childCommentActionItem}>
                      <IconButton
                        disabled={liked || disliked}
                        onClick={() => {
                          void Like(comment, idx)
                        }}
                        style={{ color: liked ? red[500] : undefined }}
                      >
                        {liked ? (
                          <FavoriteIcon className={classes.Icon} />
                        ) : (
                          <FavoriteBorderOutlinedIcon
                            className={classes.Icon}
                          />
                        )}
                      </IconButton>
                      {likesCount}
                    </div>
                    <div className={classes.childCommentActionItem}>
                      <IconButton
                        disabled={liked || disliked}
                        onClick={() => {
                          void Dislike(comment, idx)
                        }}
                      >
                        {disliked ? (
                          <ThumbDownIcon className={classes.Icon} />
                        ) : (
                          <ThumbDownOutlinedIcon className={classes.Icon} />
                        )}
                      </IconButton>
                      {dislikesCount}
                    </div>
                  </Typography>
                )}
                <Button
                  className={classes.replyButton}
                  color="primary"
                  onClick={() => {
                    handleDisplayReplyBox(comment)
                  }}
                  size="small"
                  variant="text"
                >
                  回复
                </Button>
              </footer>
            </div>
          </div>
        )
      })}
    </section>
  )
}
