import React, { FC, createRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from '@/routes'
import { Typography } from '@material-ui/core'

// hooks
import usePostCommentAdmin from './usePostCommentAdmin'
import useStyles from './useStyles'

// components
import { ScrollTop } from '@/components/ScrollTop'
import Table from './Table'

const PostCommentAdmin: FC<RouteComponentProps & RouteConfig> = (props) => {
  const { location } = props
  const classes = useStyles()
  const ref = createRef()
  const {
    loading,
    total,
    capacity,
    isASC,
    comments,
    handlePageChange,
  } = usePostCommentAdmin(location)

  // 生成query-params
  const query = new URLSearchParams()
  query.set('capacity', String(capacity))
  query.set('isASC', String(isASC))

  return (
    <div className={classes.root}>
      <section className={classes.posts}>
        {
          <Table
            loading={loading}
            onPageChange={handlePageChange}
            pageSize={capacity}
            rowCount={total}
            rows={comments}
          />
        }
      </section>
      <footer className={classes.footer}>
        <Typography
          align="center"
          className="non-select"
          gutterBottom
          variant="body2"
        >
          共{total}条评论
        </Typography>
      </footer>
      <ScrollTop {...props} ref={ref} />
    </div>
  )
}

export default PostCommentAdmin
