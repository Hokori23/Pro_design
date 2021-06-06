import React, { FC, useState } from 'react'
import {
  IconButton,
  Avatar,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core'
import moment from 'moment'
import Request from '@/utils/Request'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import { red } from '@material-ui/core/colors'
import { FormattedPostComment } from '@/utils/Request/PostComment'
import { ChildComments } from './ChildComments'
import { ReplyComment } from './ReplyComment'
import { isDef, scrollTo } from '@/utils/tools'

const useStyles = makeStyles((theme) => ({
  rootComment: {
    display: 'flex',
    borderBottom: '1px solid #e7e7e7',
    padding: '0 1rem',
    marginBottom: '1rem',
  },
  rootCommentAvatar: {
    '& .MuiAvatar-root': {
      width: 48,
      height: 48,
    },
    width: 48,
    height: 48,
    padding: 0,
    marginRight: 22,
  },
  rootCommentBox: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  rootCommentAuthorName: {
    fontWeight: 600,
    textTransform: 'inherit',
    letterSpacing: '0.08333em',
  },
  rootCommentText: {
    wordBreak: 'break-word',
  },
  rootCommentFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rootCommentAction: {
    display: 'flex',
    justifySelf: 'flex-end',
    '& .MuiButtonBase-root.MuiIconButton-root': {
      padding: 5,
    },
  },
  rootCommentActionItem: {
    marginRight: 10,
  },
  Icon: {
    fontSize: 20,
  },
  replyButton: {
    marginLeft: 5,
    minWidth: 40,
    [theme.breakpoints.up(700)]: {
      minWidth: 50,
    },
  },
}))
interface RootCommentProps {
  comment: FormattedPostComment
  isMobileSize: boolean
}
export const RootComment: FC<RootCommentProps> = ({
  comment,
  isMobileSize,
}) => {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [displayReplyBox, setDisplayReplyBox] = useState(false)
  const [replyParent, setReplyParent] = useState<
    FormattedPostComment | undefined
  >(undefined)

  const classes = useStyles()

  const Like = async () => {
    const res = await Request.PostComment.Like(comment.id)
    if (res && res?.code === 0) {
      comment.likesCount++
      setLiked(true)
    }
  }
  const Dislike = async () => {
    const res = await Request.PostComment.Dislike(comment.id)
    if (res && res?.code === 0) {
      comment.dislikesCount++
      setDisliked(true)
    }
  }
  const handleDisplayReplyBox = (parent?: FormattedPostComment) => {
    if (isDef(parent)) {
      setReplyParent(parent)
    } else {
      setReplyParent(undefined)
    }
    setDisplayReplyBox(true)
    setTimeout(() => scrollTo(`#replyComment-${comment.id}`, 'end'))
  }

  return (
    <section className={classes.rootComment}>
      {/* AVATAR */}
      <IconButton className={classes.rootCommentAvatar} color="primary">
        <Avatar
          alt={comment.author?.userName || comment.email}
          src={comment.author?.avatarUrl}
        />
      </IconButton>
      <div className={classes.rootCommentBox}>
        {/* AUTHOR */}
        <Typography
          className={classes.rootCommentAuthorName}
          color="primary"
          gutterBottom
          variant="subtitle2"
        >
          {comment.author?.userName || comment.email}
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
            {moment(comment.createdAt).calendar()}
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
                <IconButton disabled={liked || disliked} onClick={Dislike}>
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
                  className={classes.replyButton}
                  color="primary"
                  onClick={() => {
                    handleDisplayReplyBox()
                  }}
                  size="small"
                  variant="text"
                >
                  回复
                </Button>
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
      </div>
    </section>
  )
}
