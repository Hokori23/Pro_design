import React, { FC } from 'react'
import { FormattedPostComment } from '@/utils/Request/PostComment'
import { IconButton, Avatar, Typography, Button } from '@mui/material'
import classnames from 'classnames'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { red } from '@mui/material/colors'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

// hooks
import useStyles from './useStyles'
import useChildComment from './useChildComment'
import { SimpleConfirmDialog } from '@/components/SimpleConfirmDialog'
import InnerLink from '@/components/InnerLink'
import { PathName } from '@/routes'

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
  const {
    childComments,
    deleteDialog,
    deleteComment,
    deleting,
    isAdmin,
    handleDialogClose,
    handleDialogOpen,
    handleDeleteComment,
    Like,
    Dislike,
  } = useChildComment(rootComment)

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
        const isSelected = deleteDialog && deleteComment.id === id
        return (
          <div
            className={classnames(
              classes.childComment,
              isSelected ? classes.childCommentSelected : '',
              isSelected ? 'disabled' : '',
            )}
            key={id}
          >
            <IconButton
              className={classes.childCommentAvatar}
              color="primary"
              disabled={!author}
              size="large"
            >
              <InnerLink to={`${PathName._USER_DETAIL}/${String(author?.id)}`}>
                <Avatar
                  alt={author?.userName || email}
                  src={author?.avatarUrl}
                />
              </InnerLink>
            </IconButton>
            <div className={classes.childCommentBox}>
              <Typography component="div">
                <Typography
                  className={classes.childCommentAuthorName}
                  color={author ? 'primary' : 'textPrimary'}
                  variant="caption"
                >
                  {author ? (
                    <InnerLink
                      to={`${PathName._USER_DETAIL}/${String(author.id)}`}
                    >
                      {author.userName}
                    </InnerLink>
                  ) : (
                    email
                  )}
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
                  {formatDistanceToNow(new Date(createdAt), {
                    locale: zhCN,
                    addSuffix: true,
                  })}
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
                        size="large"
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
                        size="large"
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
                  className={classes.button}
                  color="primary"
                  onClick={() => {
                    handleDisplayReplyBox(comment)
                  }}
                  size="small"
                  variant="text"
                >
                  回复
                </Button>
                {isAdmin && (
                  <Button
                    className={classnames(classes.button, classes.deleteButton)}
                    onClick={() => {
                      handleDialogOpen(comment)
                    }}
                    size="small"
                    variant="text"
                  >
                    删除
                  </Button>
                )}
              </footer>
            </div>
          </div>
        )
      })}
      {/* DeleteDialog */}
      {isAdmin && (
        <SimpleConfirmDialog
          content="确定要删除此评论？"
          handleClose={handleDialogClose}
          isMobileSize={isMobileSize}
          loading={deleting}
          onBackdropClick={handleDialogClose}
          onClose={handleDialogClose}
          onConfirm={handleDeleteComment}
          open={deleteDialog}
          title="提示"
        />
      )}
    </section>
  )
}
