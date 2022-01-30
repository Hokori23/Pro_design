import React, { FC } from 'react'
import { IconButton, Avatar, Typography, Button } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { red } from '@mui/material/colors'
import { FormattedPostComment } from '@/utils/Request/PostComment'
import { ChildComments } from '../ChildComment'
import { ReplyComment } from '../ReplyComment'
import classnames from 'classnames'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

// hooks
import useRootComment from './useRootComment'
import useStyles from './useStyles'
import { SimpleConfirmDialog } from '@/components/SimpleConfirmDialog'
import InnerLink from '@/components/InnerLink'
import { PathName } from '@/routes'

interface RootCommentProps {
  comment: FormattedPostComment
  isMobileSize: boolean
}
export const RootComment: FC<RootCommentProps> = ({
  comment,
  isMobileSize,
}) => {
  const classes = useStyles()
  const {
    liked,
    disliked,
    displayReplyBox,
    replyParent,
    deleteDialog,
    deleting,
    isAdmin,
    handleDialogClose,
    handleDeleteComment,
    setDeleteDialog,
    setDisplayReplyBox,
    Like,
    Dislike,
    handleDisplayReplyBox,
  } = useRootComment(comment)
  return (
    <section
      className={classnames(
        classes.rootComment,
        deleteDialog ? classes.rootCommentSelected : '',
        deleteDialog ? 'disabled' : '',
      )}
    >
      {/* AVATAR */}
      <IconButton
        className={classes.rootCommentAvatar}
        color="primary"
        disabled={!comment?.author}
        size="large"
      >
        <InnerLink
          to={`${PathName._USER_DETAIL}/${String(comment?.author?.id)}`}
        >
          <Avatar
            alt={comment.author?.userName || comment.email}
            src={comment.author?.avatarUrl}
          />
        </InnerLink>
      </IconButton>
      <div className={classes.rootCommentBox}>
        {/* AUTHOR */}
        <Typography
          className={classes.rootCommentAuthorName}
          color={comment?.author ? 'primary' : 'textPrimary'}
          gutterBottom
          variant="subtitle2"
        >
          {comment?.author ? (
            <InnerLink
              to={`${PathName._USER_DETAIL}/${String(comment.author.id)}`}
            >
              {comment.author?.userName}
            </InnerLink>
          ) : (
            comment.email
          )}
        </Typography>
        {/* CONTENT */}
        <Typography
          className={classes.rootCommentText}
          gutterBottom={isMobileSize}
          variant="body2"
        >
          {comment.content}
        </Typography>
        <footer className={classes.rootCommentFooter}>
          {/* CREATED_AT TIME */}
          <Typography color="textSecondary" variant="caption">
            {formatDistanceToNow(new Date(comment.createdAt), {
              locale: zhCN,
              addSuffix: true,
            })}
          </Typography>
          {/* ACTION */}
          {!isMobileSize && (
            <Typography
              className={classes.rootCommentAction}
              color="textSecondary"
              variant="caption"
            >
              <div className={classes.rootCommentActionItem}>
                <IconButton
                  disabled={liked || disliked}
                  onClick={Like}
                  size="large"
                  style={{ color: liked ? red[500] : undefined }}
                >
                  {liked ? (
                    <FavoriteIcon className={classes.Icon} />
                  ) : (
                    <FavoriteBorderOutlinedIcon className={classes.Icon} />
                  )}
                </IconButton>
                {comment.likesCount}
              </div>
              <div className={classes.rootCommentActionItem}>
                <IconButton
                  disabled={liked || disliked}
                  onClick={Dislike}
                  size="large"
                >
                  {disliked ? (
                    <ThumbDownIcon className={classes.Icon} />
                  ) : (
                    <ThumbDownOutlinedIcon className={classes.Icon} />
                  )}
                </IconButton>
                {comment.dislikesCount}
              </div>
              <div className={classes.rootCommentActionItem}>
                <Button
                  className={classes.button}
                  color="primary"
                  onClick={() => {
                    handleDisplayReplyBox()
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
                      setDeleteDialog(true)
                    }}
                    size="small"
                    variant="text"
                  >
                    删除
                  </Button>
                )}
              </div>
            </Typography>
          )}
        </footer>

        {/* ChildComments */}
        {comment.children && (
          <ChildComments
            handleDisplayReplyBox={handleDisplayReplyBox}
            isMobileSize={isMobileSize}
            rootComment={comment}
          />
        )}

        {/* ReplyComment */}
        {displayReplyBox && (
          <ReplyComment
            id={`replyComment-${comment.id}`}
            parent={replyParent}
            root={comment}
            setDisplayReplyBox={setDisplayReplyBox}
          />
        )}

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
      </div>
    </section>
  )
}
