import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { isUndef } from '@/utils/tools'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { RouteConfig } from '@/routes'

import usePostDetail from './usePostDetail'

import { PostDetailItem } from '@/components/PostDetailItem'

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

const PostDetail: FC<RouteComponentProps & RouteConfig> = ({ location }) => {
  const { id } = useParams<{ id: string }>()
  const classes = useStyles()
  const { loading, post } = usePostDetail(location, id)
  return (
    <div className={classes.wrapper}>
      <div className={classes.postWrapper}>
        {isUndef(post) && loading ? (
          <div>loading</div>
        ) : (
          <PostDetailItem post={post} />
        )}
      </div>
    </div>
  )
}
export default PostDetail
