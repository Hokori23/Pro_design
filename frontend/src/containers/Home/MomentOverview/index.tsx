import React, { FC, createRef } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { PathName, RouteConfig } from '@/routes'
import { Typography } from '@material-ui/core'

// hooks
import useMomentOverview from './useMomentOverview'

// components
import { MomentOverviewItem } from '@/components/MomentOverviewItem'
import { ScrollTop } from '@/components/ScrollTop'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { CircularLoading } from '@/components/CircularLoading'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    paddingBottom: '0.5rem',
    height: '100%',
  },
  moments: {
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

const Moment: FC<RouteComponentProps & RouteConfig> = (props) => {
  const { location } = props
  const classes = useStyles()
  const ref = createRef()
  const {
    loading,
    page,
    total,
    maxPage,
    moments,
    paginationQuery,
  } = useMomentOverview(location)

  return (
    <div className={classes.root}>
      <section className={classes.moments}>
        {loading ? (
          <CircularLoading />
        ) : moments.length ? (
          moments.map((moment, idx) => (
            <MomentOverviewItem key={moment.id} moment={moment} />
          ))
        ) : (
          <div className="spread-box flex flex-center">
            <Typography align="center" color="primary" variant="h3">
              查无说说
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
          共{total}条说说
        </Typography>
      </footer>
      <ScrollTop {...props} ref={ref} />
    </div>
  )
}
export default Moment
