import React, { FC } from 'react'
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  ExpandLess,
  ExpandMore,
  Subject as SubjectIcon,
} from '@material-ui/icons'
import classnames from 'classnames'

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
      height: '60vh',
    },
  },
}))

interface EditorProps {
  className?: string
}
const Editor: FC<EditorProps> = ({ className }) => {
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
    <section>
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
        <List
          className={classnames(className, classes.editor)}
          component="div"
          disablePadding
        >
          <_Editor
            content={content}
            coverUrl={coverUrl}
            onChange={handleMdContentChange}
            title={title as string}
          />
        </List>
      </Collapse>
    </section>
  )
}

export default Editor
