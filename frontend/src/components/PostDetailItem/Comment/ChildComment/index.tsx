import React, { FC } from 'react'
import { FormattedPostComment } from '@/utils/Request/PostComment'
import { IconButton, Avatar, Typography, Button } from '@material-ui/core'
import classnames from 'classnames'
import moment from 'moment'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import { red } from '@material-ui/core/colors'

// hooks
import useStyles from './useStyles'
import useChildComment from './useChildComment'

interface ChildCommentsProps {
  rootComment: FormattedPostComment
  isMobileSize: boolean
  handleDisplayReplyBox: (parent?: FormattedPostComment) => void
}
export const ChildComments: FC<ChildCommentsProps> = ({
  rootComment,
  isMobileSize,
  handleDisplayReplyBox,
}) => {
  const classes = useStyles()
  const { childComments, Like, Dislike } = useChildComment(rootComment)
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
                  {moment(createdAt).calendar()}
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
