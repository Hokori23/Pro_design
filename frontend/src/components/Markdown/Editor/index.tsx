import React, { FC, Fragment, useEffect, useRef } from 'react'
import MdEditor from 'react-markdown-editor-lite'
import { Renderer } from '../Renderer'
import { makeStyles } from '@material-ui/core/styles'
import 'react-markdown-editor-lite/lib/index.css'

// components
import { Title } from './Title'

const useStyles = makeStyles((theme) => ({
  editor: {
    height: '100%',
    width: '100%',
    '& .rc-md-editor.full': {
      zIndex: 9999,
    },
    [theme.breakpoints.down('sm')]: {
      '& .rc-md-editor .editor-container': {
        flexDirection: 'column',
      },
      '& .rc-md-editor .editor-container > section': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      },
    },
  },
  post: {
    marginBottom: '1rem',
    [theme.breakpoints.up(700)]: {
      marginBottom: '2rem',
      width: '100%',
      alignSelf: 'center',
    },
    flexGrow: 1,
    '& .MuiTypography-root': {
      margin: '0 !important',
    },
  },
}))

MdEditor.useLocale('zhCN')

export interface EditorProps {
  title: string
  coverUrl?: string
  content: string
  onChange:
    | ((
        data: {
          text: string
          html: string
        },
        event?: React.ChangeEvent<HTMLTextAreaElement> | undefined,
      ) => void)
    | undefined
}
export const Editor: FC<EditorProps> = ({
  title,
  coverUrl,
  content,
  onChange,
}) => {
  const mdEditor = useRef(null)
  const classes = useStyles()

  useEffect(() => {
    MdEditor.useLocale('zhCN')
  }, [])

  return (
    <div className={classes.editor}>
      <MdEditor
        onChange={onChange}
        ref={mdEditor}
        renderHTML={(text) => (
          <Fragment>
            {/* TODO: title不能立即更新，只能随着content更新而更新 */}
            <Title coverUrl={coverUrl} title={title} />
            <Renderer className={classes.post} content={text} />
          </Fragment>
        )}
        style={{ height: '100%', width: '100%' }}
        value={content}
      />
    </div>
  )
}
