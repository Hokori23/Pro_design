import React, { FC } from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn' // <https://segmentfault.com/q/1010000039869039/a-1020000039869980>
import { Post } from '@/utils/Request/Post'
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
  Badge,
  useMediaQuery,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import VisibilityIcon from '@material-ui/icons/Visibility'
import CommentIcon from '@material-ui/icons/Comment'
import { useStyles } from './useStyles'
import { Link } from 'react-router-dom'
import { PathName } from '@/routes'

// components
import { CardMedia } from '@/components/CardMedia'
import { Renderer } from '@/components/Markdown/Renderer'

moment.locale('zh-cn')
interface PostOverviewItemProps {
  post: Post
}

export const PostOverviewItem: FC<PostOverviewItemProps> = ({ post }) => {
  const {
    id,
    // uid,
    title,
    coverUrl,
    content,
    // type,
    // draftContent,
    // isDraft,
    // isHidden,
    // isLocked,
    // priority,
    // likesCount,
    // dislikesCount,
    pageViews,
    postComments,
    createdAt,
    updatedAt,
  } = post
  const classes = useStyles()
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card className={classes.root}>
      <Link className="plain-a" to={`${PathName._POST_DETAIL}/${Number(id)}`}>
        <CardActionArea>
          {coverUrl && (
            <CardMedia
              className={classes.media}
              component="img"
              image={coverUrl}
              innerClassName={classes.mediaInner}
              title={title}
            />
          )}
          <CardContent>
            <Typography
              className={classes.title}
              component="h2"
              gutterBottom
              variant="h5"
            >
              {title}
            </Typography>
            <Typography
              className={classes.content}
              color="textSecondary"
              component="div"
              style={{ fontSize: 5 }}
              variant="body2"
            >
              <Renderer content={content} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <section className={classes.actionsWrapper}>
        <div className={classes.actions}>
          <IconButton disabled style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
            <Badge badgeContent={pageViews} color="primary">
              <VisibilityIcon fontSize={isMobileSize ? 'small' : 'default'} />
            </Badge>
          </IconButton>
          <IconButton disabled style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
            <Badge badgeContent={postComments?.length} color="primary">
              <CommentIcon fontSize={isMobileSize ? 'small' : 'default'} />
            </Badge>
          </IconButton>
        </div>
        <div className="flex flex-center">
          <Typography
            className={classes.actionsText}
            color="textSecondary"
            component="div"
          >
            <Typography component="p" variant="caption">
              创建时间:
            </Typography>
            <Typography component="p" variant="caption">
              最后修改时间:
            </Typography>
          </Typography>
          <Typography
            className={classes.actionsText}
            color="textSecondary"
            component="div"
          >
            <Typography component="p" variant="caption">
              {/* {moment(createdAt).format(isMobileSize ? 'l' : 'lll')} */}
              {moment(createdAt).calendar()}
            </Typography>
            <Typography component="p" variant="caption">
              {/* {moment(updatedAt).format(isMobileSize ? 'l' : 'lll')} */}
              {moment(updatedAt).calendar()}
            </Typography>
          </Typography>
        </div>
      </section>
    </Card>
  )
}
