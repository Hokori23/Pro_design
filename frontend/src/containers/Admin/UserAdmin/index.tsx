import React, { FC, createRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from '@/routes'
import { Typography } from '@mui/material'

// hooks
import useUserAdmin from './useUserAdmin'
import useStyles from './useStyles'

// components
import { ScrollTop } from '@/components/ScrollTop'
import Table from './Table'

const MomentAdmin: FC<RouteComponentProps & RouteConfig> = (props) => {
  const classes = useStyles()
  const ref = createRef()
  const {
    loading,
    users,
    pageSize,
    rowsPerPageOptions,
    handlePageSizeChange,
  } = useUserAdmin()
  return (
    <div className={classes.root}>
      <section className={classes.posts}>
        {
          <Table
            loading={loading}
            onPageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
            rowCount={users.length}
            rows={users}
            rowsPerPageOptions={rowsPerPageOptions}
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
          共{users.length}个用户
        </Typography>
      </footer>
      <ScrollTop {...props} ref={ref} />
    </div>
  )
}

export default MomentAdmin
