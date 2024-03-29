import React, { FC } from 'react'
import {
  Collapse,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import {
  ExpandLess,
  ExpandMore,
  Edit as EditIcon,
  CloudUpload,
} from '@mui/icons-material'
import { formValid } from '@/components/UserFormValid'
import { cloneDeep } from 'lodash-es'
import { $ } from '@/utils/tools'
import classnames from 'classnames'

// hooks
import useAction from './useAction'

// components
import { Input } from '@/components/Input'
import TagSelect from './TagSelect'
import PostAction from './PostAction'

const useStyles = makeStyles((theme) => ({
  parentListItem: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.getContrastText(theme.palette.grey[300]),
    },
  },
  parentIcon: {
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    '&:hover': {
      color: theme.palette.getContrastText(theme.palette.grey[300]),
    },
  },
  listItem: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      maxWidth: 500,
    },
  },
  postAction: {
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },
  tags: {
    minHeight: 50,
    width: '100%',
  },
}))

interface ActionProps {
  className?: string
}
const Action: FC<ActionProps> = ({ className }) => {
  const classes = useStyles()
  const {
    state,
    dispatch,
    openAction,
    titleError,
    coverUrlError,
    setTitleError,
    setCoverUrlError,
    handleOpenAction,
    onTagChange,
    handleImgUpload,
  } = useAction()

  return (
    <header>
      <ListItem
        button
        className={classes.parentListItem}
        onClick={handleOpenAction}
      >
        <ListItemIcon className={classes.parentIcon}>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="文章信息" />
        {openAction ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openAction} timeout="auto" unmountOnExit>
        <List className={className} component="div" disablePadding>
          <ListItem
            className={classnames(classes.listItem, classes.postAction)}
          >
            <PostAction />
          </ListItem>
          <ListItem className={classes.listItem}>
            <Input
              error={titleError.error}
              fullWidth
              helperText={titleError.text}
              label="标题"
              multiline
              onBlur={(e) =>
                formValid({
                  postTitle: {
                    value: e.target.value,
                    errorSetter: setTitleError,
                  },
                })
              }
              onChange={(e) => {
                dispatch.SET_POST({
                  ...cloneDeep(state.post),
                  title: e.target.value,
                })
                formValid({
                  postTitle: {
                    value: e.target.value,
                    errorSetter: setTitleError,
                  },
                })
              }}
              value={state.post.title}
            />
          </ListItem>

          <ListItem className={classes.listItem}>
            <TagSelect
              className={classes.tags}
              loading={state.loadingTags}
              onChange={onTagChange}
              options={state.tags}
            />
          </ListItem>

          <ListItem className={classes.listItem}>
            <Input
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip placement="top" title="上传图片">
                      <IconButton
                        onClick={() => {
                          $('#cover-url__upload')?.click()
                        }}
                        size="large"
                      >
                        <CloudUpload />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              error={coverUrlError.error}
              fullWidth
              helperText={coverUrlError.text}
              label="主图链接"
              multiline
              onBlur={(e) =>
                e.target.value
                  ? formValid({
                      postCoverUrl: {
                        value: e.target.value,
                        errorSetter: setCoverUrlError,
                      },
                    })
                  : setCoverUrlError({ error: false, text: '' })
              }
              onChange={(e) => {
                dispatch.SET_POST({
                  ...cloneDeep(state.post),
                  coverUrl: e.target.value,
                })
                e.target.value
                  ? formValid({
                      postCoverUrl: {
                        value: e.target.value,
                        errorSetter: setCoverUrlError,
                      },
                    })
                  : setCoverUrlError({ error: false, text: '' })
              }}
              placeholder="http(s)://..."
              value={state.post.coverUrl || ''}
            />
            <input
              accept="image/png, image/jpeg, image/jpg"
              className="non-display"
              id="cover-url__upload"
              onInput={handleImgUpload}
              type="file"
            />
          </ListItem>
        </List>
      </Collapse>
    </header>
  )
}

export default Action
