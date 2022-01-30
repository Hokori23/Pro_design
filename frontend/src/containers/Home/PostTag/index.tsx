import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import makeStyles from '@mui/styles/makeStyles'
import { PathName, RouteConfig } from '@/routes'
import { Chip, Typography } from '@mui/material'
import Icon from '@mui/material/Icon'
import classnames from 'classnames'

// hooks
import usePostTag from './usePostTag'

// components
import { PageLoading } from '@/components/PageLoading'
import InnerLink from '@/components/InnerLink'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    height: '100%',
  },
  tags: {
    [theme.breakpoints.up(700)]: {
      width: 700,
      alignSelf: 'center',
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    background: '#fff',
    padding: '2rem',
    flexGrow: 1,
  },
  tag: {
    marginRight: '1rem',
    '&:last-child': {
      marginRight: 0,
    },
  },
}))
const PostTag: FC<RouteComponentProps & RouteConfig> = (props) => {
  const classes = useStyles()
  const { tags, loading } = usePostTag()

  if (loading) return <PageLoading />

  return (
    <div className={classes.root}>
      <section className={classes.tags}>
        {tags?.length ? (
          tags?.map((tag) => (
            <InnerLink
              className={classnames('plain-a', classes.tag)}
              key={tag.id}
              to={`${PathName._POST_TAG_OVERVIEW}/${tag.slug}`}
            >
              <Chip
                clickable
                color={tag.iconColor}
                icon={tag.iconClass ? <Icon>{tag.iconClass}</Icon> : undefined}
                label={tag.name}
                style={{ marginBottom: '1rem' }}
                variant="outlined"
              />
            </InnerLink>
          ))
        ) : (
          <div className="spread-box flex flex-center">
            <Typography align="center" color="primary" variant="h3">
              查无标签
            </Typography>
          </div>
        )}
      </section>
    </div>
  )
}

export default PostTag
