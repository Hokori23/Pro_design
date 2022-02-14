import React, { FC } from 'react'
import makeStyles from '@mui/styles/makeStyles'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from '@/routes'

// hooks
import usePostDetail from './usePostDetail'

// components
import { PostDetailItem } from '@/components/PostDetailItem'
import { ScrollTop } from '@/components/ScrollTop'
import { PageLoading } from '@/components/PageLoading'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    height: '100%',
    flexGrow: 1,
  },
  postWrapper: {
    flexGrow: 1,
  },
}))

const PostDetail: FC<RouteComponentProps & RouteConfig> = (props) => {
  const classes = useStyles()
  const { loading, post, ref, state } = usePostDetail()

  if (loading && !state.loadingComment) return <PageLoading />
  return (
    <div className={classes.wrapper}>
      <div className={classes.postWrapper}>
        {<PostDetailItem post={post} />}
      </div>
      <ScrollTop {...props} ref={ref} />
    </div>
  )
}
export default React.memo(PostDetail)
