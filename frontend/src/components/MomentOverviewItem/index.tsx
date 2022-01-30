import React, { FC, useState } from 'react'
import _moment from 'moment'
import 'moment/locale/zh-cn' // <https://segmentfault.com/q/1010000039869039/a-1020000039869980>
import { PostWithAuthor } from '@/utils/Request/Post'
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Avatar,
  CardHeader,
  Tooltip,
  ClickAwayListener,
} from '@mui/material'
import { red } from '@mui/material/colors'
import Request from '@/utils/Request'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { useStyles } from './useStyles'
import { cloneDeep } from 'lodash-es'

// components

_moment.locale('zh-cn')
interface MomentOverviewItemProps {
  moment: PostWithAuthor
}

interface MomentWithStatus extends PostWithAuthor {
  liked: boolean
  disliked: boolean
}
const defaultMomentWithStatus: MomentWithStatus = {
  liked: false,
  disliked: false,
} as any

export const MomentOverviewItem: FC<MomentOverviewItemProps> = ({ moment }) => {
  const [clonedMoment, setMoment] = useState(
    Object.assign(
      cloneDeep(moment),
      defaultMomentWithStatus,
    ) as MomentWithStatus,
  )

  const [openTooltip, setOpenTooltip] = useState(false)

  const {
    id,
    // uid,
    content,
    // type,
    // draftContent,
    // isDraft,
    // isHidden,
    // isLocked,
    // priority,
    // likesCount,
    // dislikesCount,
    author,
    createdAt,
    likesCount,
    dislikesCount,
    liked,
    disliked,
  } = clonedMoment
  const classes = useStyles()

  const Like = async () => {
    const res = await Request.Post.Like(id as number)
    if (res?.code === 0) {
      setMoment(
        Object.assign(cloneDeep(clonedMoment), {
          likesCount: clonedMoment.likesCount + 1,
          liked: true,
        }),
      )
    }
  }
  const Dislike = async () => {
    const res = await Request.Post.Dislike(id as number)
    if (res?.code === 0) {
      setMoment(
        Object.assign(cloneDeep(clonedMoment), {
          dislikesCount: clonedMoment.dislikesCount + 1,
          disliked: true,
        }),
      )
    }
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar alt={author.userName} src={author.avatarUrl} />}
        subheader={_moment(createdAt).format('l HH:mm')}
        title={author.userName}
      />
      <CardContent className={classes.content}>
        <ClickAwayListener onClickAway={() => setOpenTooltip(false)}>
          <Tooltip
            disableFocusListener
            followCursor
            onClose={() => setOpenTooltip(false)}
            onMouseEnter={() => setOpenTooltip(true)}
            open={openTooltip}
            title={content}
          >
            <Typography
              className={classes.contentText}
              color="textSecondary"
              component="div"
              onClick={() => setOpenTooltip(!openTooltip)}
              variant="body1"
            >
              {content}
            </Typography>
          </Tooltip>
        </ClickAwayListener>
      </CardContent>
      <section className={classes.actionsWrapper}>
        <div className={classes.actions}>
          <div className={classes.actionItem}>
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
            {likesCount}
          </div>
          <div className={classes.actionItem}>
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
            {dislikesCount}
          </div>
        </div>
      </section>
    </Card>
  )
}
