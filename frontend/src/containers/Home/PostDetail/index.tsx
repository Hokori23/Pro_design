import React, { createRef, FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { RouteConfig } from '@/routes'

import usePostDetail from './usePostDetail'

import { PostDetailItem } from '@/components/PostDetailItem'
import { ScrollTop } from '@/components/ScrollTop'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    height: '100%',
  },
  postWrapper: {
    flexGrow: 1,
  },
}))

const PostDetail: FC<RouteComponentProps & RouteConfig> = (props) => {
  const { id } = useParams<{ id: string }>()
  const classes = useStyles()
  const ref = createRef()
  const { loading, post } = usePostDetail(id)
  return (
    <div className={classes.wrapper}>
      <div className={classes.postWrapper}>
        {loading ? <div>loading</div> : <PostDetailItem post={post} />}
      </div>
      <ScrollTop {...props} ref={ref} />
    </div>
  )
}
export default PostDetail
