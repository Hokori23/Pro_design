import React, { FC, useState } from 'react'
import { Typography, IconButton, Badge } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Request from '@/utils/Request'
import { red } from '@material-ui/core/colors'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { PostWithAuthor } from '@/utils/Request/Post'
import { store } from '@/store'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  postAction: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '1rem',
    '& .MuiButtonBase-root.MuiIconButton-root': {
      padding: 5,
    },
    [theme.breakpoints.up(700)]: {
      marginBottom: '2rem',
    },
  },
  postActionItem: {
    marginRight: 10,
  },
  Icon: {
    fontSize: 20,
    [theme.breakpoints.up(700)]: {
      fontSize: 25,
    },
  },
}))
interface ActionProps {
  post: PostWithAuthor
  isMobileSize: boolean
}
export const Action: FC<ActionProps> = ({ post, isMobileSize }) => {
  const dispatch = useSelector(() => store.dispatch.postDetail)

  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const classes = useStyles()

  const Like = async () => {
    const res = await Request.Post.Like(post.id as number)
    if (res?.code === 0) {
      dispatch.SET_POST({
        ...post,
        likesCount: post.likesCount + 1,
      })
      setLiked(true)
    }
  }
  const Dislike = async () => {
    const res = await Request.Post.Dislike(post.id as number)
    if (res?.code === 0) {
      dispatch.SET_POST({
        ...post,
        dislikesCount: post.dislikesCount + 1,
      })
      setDisliked(true)
    }
  }
  return (
    <Typography
      className={classes.postAction}
      color="textSecondary"
      variant="caption"
    >
      <div className={classes.postActionItem}>
        <IconButton disabled style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
          <Badge badgeContent={post.pageViews} color="primary">
            <VisibilityIcon />
          </Badge>
        </IconButton>
      </div>
      <div className={classes.postActionItem}>
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
        {post.likesCount}
      </div>
      <div className={classes.postActionItem}>
        <IconButton disabled={liked || disliked} onClick={Dislike}>
          {disliked ? (
            <ThumbDownIcon className={classes.Icon} />
          ) : (
            <ThumbDownOutlinedIcon className={classes.Icon} />
          )}
        </IconButton>
        {post.dislikesCount}
      </div>
    </Typography>
  )
}
