import React, { FC } from 'react'
import {
  Chip,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import { PostTag } from '@/utils/Request/PostTag'
import classnames from 'classnames'

// components
import { CircularLoading } from '@/components/CircularLoading'

const useStyles = makeStyles((theme) => ({
  main: {
    position: 'relative',
    width: '100%',
  },
  list: {
    width: '100%',
  },
  tip: {
    alignSelf: 'center',
    width: '100%',
  },
}))

interface ListTagItemProps {
  tag: PostTag
  selectedTag: PostTag | null
  onClick: (tag: PostTag) => void
  handleDelete: (tag: PostTag) => void
}
const ListTagItem: FC<ListTagItemProps> = ({
  tag,
  selectedTag,
  onClick,
  handleDelete,
}) => {
  const { name, iconClass, iconColor, description } = tag
  const theme = useTheme()
  const style =
    iconColor && iconColor !== 'default'
      ? {
          backgroundColor: theme.palette[iconColor].main,
          color: theme.palette.getContrastText(theme.palette[iconColor].main),
        }
      : undefined
  return (
    <ListItem
      button
      onClick={() => {
        onClick(tag)
      }}
      selected={selectedTag?.id ? selectedTag.id === tag.id : undefined}
      style={style}
      title={description}
    >
      {iconClass ? (
        <ListItemIcon>
          <Chip
            className="cursor-pointer"
            color={iconColor}
            icon={iconClass ? <Icon>{iconClass}</Icon> : undefined}
            label={name}
          />
        </ListItemIcon>
      ) : (
        <ListItemText primary={name} />
      )}
      <ListItemSecondaryAction>
        <IconButton
          aria-label="delete"
          edge="end"
          onClick={() => {
            handleDelete(tag)
          }}
          size="medium"
          style={{ color: style?.color }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

interface MainProps {
  loading: boolean
  tags: PostTag[]
  selectedTag: PostTag | null
  style?: React.CSSProperties
  handleEdit: (tag: PostTag) => void
  handleDelete: (tag: PostTag) => void
}
const Main: FC<MainProps> = ({
  loading,
  tags,
  selectedTag,
  style,
  handleEdit,
  handleDelete,
}) => {
  const classes = useStyles()
  return (
    <section
      className={classnames(
        classes.main,
        loading ? 'flex-center' : '',
        'spread-box flex',
      )}
    >
      {loading ? (
        <CircularLoading />
      ) : tags.length ? (
        <List
          className={classes.list}
          component="ul"
          style={style}
          subheader={<ListSubheader component="div">标签</ListSubheader>}
        >
          {tags.map((tag) => (
            <ListTagItem
              handleDelete={handleDelete}
              key={tag.id}
              onClick={handleEdit}
              selectedTag={selectedTag}
              tag={tag}
            />
          ))}
        </List>
      ) : (
        <Typography
          align="center"
          className={classnames(classes.tip, 'non-select')}
          color="primary"
          variant="h5"
        >
          暂无标签
        </Typography>
      )}
    </section>
  )
}

export default Main
