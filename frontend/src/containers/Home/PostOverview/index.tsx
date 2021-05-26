import React, { FC, createRef } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { PathName, RouteConfig } from '@/routes'
import { Typography } from '@material-ui/core'
import { useAsync } from 'react-use'
import { isDef } from '@/utils/tools'

import usePostOverview from './usePostOverview'

import { PostOverviewItem } from 'components/PostOverviewItem'
import { ScrollTop } from '@/components/ScrollTop'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { CircularLoading } from '@/components/CircularLoading'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    paddingTop: 5,
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
  const { location, history } = props
  const classes = useStyles()
  const ref = createRef()
  const {
    loading,
    page,
    total,
    capacity,
    maxPage,
    isASC,
    postTypes,
    posts,
    RetrieveAll,
  } = usePostOverview(location)

  useAsync(async () => {
    const maxPage = await RetrieveAll(page, capacity, isASC, postTypes)
    if (isDef(maxPage) && page > maxPage) {
      // 无效路由参数
      history.replace(PathName.NOT_FOUND_PAGE)
    }
  }, [page, capacity, isASC, postTypes])

  // 生成query-params
  const query = new URLSearchParams()
  query.set('capacity', String(capacity))
  query.set('isASC', String(isASC))
  postTypes.forEach((postType) => query.set('postType', String(postType)))

  return (
    <div className={classes.root}>
      <section className={classes.posts}>
        {loading ? (
          <CircularLoading />
        ) : posts.length ? (
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
          query.delete('page')
          query.set('page', String(item.page))
          return (
            <PaginationItem
              component={Link}
              to={`${PathName.POST_OVERVIEW}?${query.toString()}`}
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
