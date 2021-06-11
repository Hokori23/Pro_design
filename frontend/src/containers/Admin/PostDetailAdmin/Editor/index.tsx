import React, { FC, Fragment } from 'react'
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import {
  ExpandLess,
  ExpandMore,
  Subject as SubjectIcon,
} from '@material-ui/icons'

// hooks
import useEditor from './useEditor'

// components
import { Editor as _Editor } from '@/components/Markdown/Editor'

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
  editor: {
    '& .rc-md-editor .editor-container .sec-md .input, & .rc-md-editor .editor-container .sec-html': {
      minHeight: '50vh',
    },
  },
}))

const Editor: FC = () => {
  const classes = useStyles()
  const {
    title,
    coverUrl,
    content,
    openEditor,
    handleOpenEditor,
    handleMdContentChange,
  } = useEditor()
  return (
    <Fragment>
      <ListItem
        button
        className={classes.parentListItem}
        onClick={handleOpenEditor}
      >
        <ListItemIcon className={classes.parentIcon}>
          <SubjectIcon />
        </ListItemIcon>
        <ListItemText primary="文章内容" />
        {openEditor ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openEditor} timeout="auto" unmountOnExit>
        <List className={classes.editor} component="div" disablePadding>
          <_Editor
            content={content}
            coverUrl={coverUrl}
            onChange={handleMdContentChange}
            title={title as string}
          />
        </List>
      </Collapse>
    </Fragment>
  )
}

export default Editor
