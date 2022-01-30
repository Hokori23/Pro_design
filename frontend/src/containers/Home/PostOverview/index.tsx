import React, { FC, createRef } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import makeStyles from '@mui/styles/makeStyles'
import { PathName, RouteConfig } from '@/routes'
import { Typography, Pagination, PaginationItem } from '@mui/material'

// hooks
import { usePostOverview } from '@/hooks/usePostOverview'

// components
import { PostOverviewItem } from '@/components/PostOverviewItem'
import { ScrollTop } from '@/components/ScrollTop'

import { PageLoading } from '@/components/PageLoading'
import { PostType } from '@/utils/Request/Post'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    paddingBottom: '0.5rem',
    height: '100%',
  },
  posts: {
    [theme.breakpoints.up(700)]: {
      width: 700,
      alignSelf: 'center',
    },
    flexGrow: 1,
  },
  pagination: {
    marginBottom: 5,
    '& > ul': {
      justifyContent: 'center',
    },
  },
}))

const PostOverview: FC<RouteComponentProps & RouteConfig> = (props) => {
  const { location } = props
  const classes = useStyles()
  const ref = createRef()
  const {
    loading,
    page,
    total,
    maxPage,
    posts,
    paginationQuery,
  } = usePostOverview({
    location,
    _postTypes: [PostType.POST, PostType.LANDSCAPE],
  })
  if (loading) return <PageLoading />

  return (
    <div className={classes.root}>
      <section className={classes.posts}>
        {posts.length ? (
          posts.map((post) => <PostOverviewItem key={post.id} post={post} />)
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
    </div>
  )
}
export default PostOverview
