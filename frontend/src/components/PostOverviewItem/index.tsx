import React, { FC } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { PostWithAuthor } from '@/utils/Request/Post'
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
  Badge,
  Box,
  Chip,
  Tooltip,
} from '@mui/material'
import Icon from '@mui/material/Icon'
import { useTheme } from '@mui/material/styles'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CommentIcon from '@mui/icons-material/Comment'
import { useStyles } from './useStyles'
import { Link } from 'react-router-dom'
import { PathName } from '@/routes'
import PublishIcon from '@mui/icons-material/Publish'

// components
import { CardMedia } from '@/components/CardMedia'
import { Renderer } from '@/components/Markdown/Renderer'
import InnerLink from '../InnerLink'
import { setUpYunImg } from '@/utils/tools'
import { useMobileSize } from '@/hooks/useScreenSize'

interface PostOverviewItemProps {
  post: PostWithAuthor
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
    priority,
    // likesCount,
    // dislikesCount,
    tags,
    pageViews,
    postComments,
    createdAt,
    updatedAt,
  } = post
  const classes = useStyles()
  const theme = useTheme()
  const isMobileSize = useMobileSize()

  return (
    <Card className={classes.root}>
      <Link className="plain-a" to={`${PathName._POST_DETAIL}/${Number(id)}`}>
        <CardActionArea>
          {coverUrl && (
            <CardMedia
              className={classes.media}
              component="img"
              innerClassName={classes.mediaInner}
              showLoadingImg
              src={setUpYunImg(coverUrl, 'md')}
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
              style={{ fontSize: 12 }}
              variant="body2"
            >
              <Renderer content={content.slice(0, 512)} outline />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      {!!(tags?.length || priority) && (
        <Box className={classes.tagsWrapper}>
          <section>
            {!!priority && (
              <IconButton
                disabled
                size="large"
                style={{
                  padding: 4,
                }}
              >
                <PublishIcon
                  style={{
                    color: theme.palette.error.main,
                  }}
                />
              </IconButton>
            )}
          </section>
          <section>
            {tags.slice(0, 3).map((tag) => (
              <Tooltip arrow enterDelay={200} key={tag.id} title={tag.name}>
                <InnerLink
                  className="plain-a"
                  to={`${PathName._POST_TAG_OVERVIEW}/${tag.slug}`}
                >
                  <Chip
                    className={classes.tag}
                    clickable
                    color={tag.iconColor}
                    icon={
                      tag.iconClass ? <Icon>{tag.iconClass}</Icon> : undefined
                    }
                    label={tag.name}
                    size={isMobileSize ? 'small' : 'medium'}
                    variant="outlined"
                  />
                </InnerLink>
              </Tooltip>
            ))}
            {tags.length > 3 && (
              <Chip
                className={classes.tag}
                label={`${tags.length - 3}+`}
                size={isMobileSize ? 'small' : 'medium'}
                variant="outlined"
              />
            )}
          </section>
        </Box>
      )}
      <section className={classes.actionsWrapper}>
        <div className={classes.actions}>
          <IconButton
            disabled
            size="large"
            style={{ color: 'rgba(0, 0, 0, 0.54)' }}
          >
            <Badge badgeContent={pageViews} color="primary">
              <VisibilityIcon fontSize={isMobileSize ? 'small' : 'inherit'} />
            </Badge>
          </IconButton>
          <IconButton
            disabled
            size="large"
            style={{ color: 'rgba(0, 0, 0, 0.54)' }}
          >
            <Badge badgeContent={postComments?.length} color="primary">
              <CommentIcon fontSize={isMobileSize ? 'small' : 'inherit'} />
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
              {formatDistanceToNow(new Date(createdAt), {
                locale: zhCN,
                addSuffix: true,
              })}
            </Typography>
            <Typography component="p" variant="caption">
              {formatDistanceToNow(new Date(updatedAt), {
                locale: zhCN,
                addSuffix: true,
              })}
            </Typography>
          </Typography>
        </div>
      </section>
    </Card>
  )
}
