import React, { FC, createRef, Fragment } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { PathName, RouteConfig } from '@/routes'
import {
  Box,
  Card,
  Tooltip,
  Typography,
  Pagination,
  PaginationItem,
} from '@mui/material'
import classnames from 'classnames'
import Icon from '@mui/material/Icon'

// hooks
import usePostTagOverview from './usePostTagOverview'
import useStyles from './useStyles'

// components
import { PostOverviewItem } from '@/components/PostOverviewItem'
import { ScrollTop } from '@/components/ScrollTop'

import { CircularLoading } from '@/components/CircularLoading'

const PostOverview: FC<RouteComponentProps & RouteConfig> = (props) => {
  const { location } = props
  const classes = useStyles()
  const ref = createRef()
  const {
    loadingTag,
    loadingPosts,
    page,
    total,
    maxPage,
    posts,
    tag,
    paginationQuery,
    tagStyle,
  } = usePostTagOverview(location)

  return (
    <div className={classes.root}>
      <section className={tag ? classes.tagWrapper : classes.posts}>
        {loadingTag ? (
          <CircularLoading />
        ) : tag ? (
          <Card
            className={classnames(
              'flex flex-center spread-box__x',
              classes.tagCard,
            )}
          >
            <Box
              className={classnames(
                'flex flex-center flex-column',
                classes.tag,
              )}
              style={tagStyle()}
            >
              {tag.iconClass && (
                <div>
                  <Icon color={tag.iconColor}>{tag.iconClass}</Icon>
                </div>
              )}
              {tag.name}
            </Box>
            {tag.description && (
              <Box
                className={classnames(
                  'flex flex-center flex-column',
                  classes.description,
                )}
              >
                <Tooltip
                  arrow
                  className={classes.descriptionTipText}
                  placement="bottom"
                  title={tag.description}
                >
                  <Typography className={classes.descriptionText}>
                    {tag.description}
                  </Typography>
                </Tooltip>
              </Box>
            )}
          </Card>
        ) : (
          <div className="spread-box flex flex-center">
            <Typography align="center" color="primary" variant="h3">
              查无标签
            </Typography>
          </div>
        )}
      </section>
      {tag && (
        <Fragment>
          <section className={classes.posts}>
            {loadingPosts ? (
              <CircularLoading />
            ) : posts.length ? (
              posts.map((post) => (
                <PostOverviewItem key={post.id} post={post} />
              ))
            ) : (
              <div className="spread-box flex flex-center">
                <Typography align="center" color="primary" variant="h3">
                  查无文章
                </Typography>
              </div>
            )}
          </section>
          <Pagination
            className={classes.pagination}
            count={maxPage}
            defaultPage={1}
            page={page}
            renderItem={(item) => {
              paginationQuery.delete('page')
              paginationQuery.set('page', String(item.page))
              return (
                <PaginationItem
                  component={Link}
                  to={`${PathName.POST_OVERVIEW}?${paginationQuery.toString()}`}
                  {...item}
                />
              )
            }}
          />
          <footer>
            <Typography
              align="center"
              className="non-select"
              gutterBottom
              variant="body2"
            >
              共{total}篇博文
            </Typography>
          </footer>
          <ScrollTop {...props} ref={ref} />
        </Fragment>
      )}
    </div>
  )
}
export default PostOverview
