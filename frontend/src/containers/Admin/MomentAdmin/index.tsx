import React, { FC, createRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from '@/routes'
import { Typography } from '@mui/material'

// hooks
import useMomentAdmin from './useMomentAdmin'
import useStyles from './useStyles'

// components
import { ScrollTop } from '@/components/ScrollTop'
import Table from './Table'

const MomentAdmin: FC<RouteComponentProps & RouteConfig> = (props) => {
  const { location } = props
  const classes = useStyles()
  const ref = createRef()
  const {
    loading,
    total,
    capacity,
    isASC,
    postTypes,
    posts,
    handlePageChange,
  } = useMomentAdmin(location)

  // 生成query-params
  const query = new URLSearchParams()
  query.set('capacity', String(capacity))
  query.set('isASC', String(isASC))
  postTypes.forEach((postType) => query.set('postType', String(postType)))

  return (
    <div className={classes.root}>
      <section className={classes.posts}>
        {
          <Table
            loading={loading}
            onPageChange={handlePageChange}
            pageSize={capacity}
            rowCount={total}
            rows={posts}
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
          共{total}篇博文
        </Typography>
      </footer>
      <ScrollTop {...props} ref={ref} />
    </div>
  )
}

export default MomentAdmin
