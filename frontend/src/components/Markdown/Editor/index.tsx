import React, { FC, Fragment, useEffect, useRef } from 'react'
import MdEditor from 'react-markdown-editor-lite'
import { Renderer } from '../Renderer'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import '@/static/react-markdown-editor-lite.less'

// components
import { Title } from './Title'

const useStyles = makeStyles((theme) => ({
  editor: {
    height: '100%',
    width: '100%',
    '& .rc-md-editor.full': {
      zIndex: theme.zIndex.drawer + 1,
    },
    [theme.breakpoints.down('sm')]: {
      '& .rc-md-editor': {
        border: 'unset',
      },
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
  const theme = useTheme()
  const isDeskTopSize = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    MdEditor.useLocale('zhCN')
  }, [])

  // 移动端自动关闭预览区
  useEffect(() => {
    if (mdEditor.current) {
      const mdDom = (mdEditor.current as unknown) as MdEditor
      mdDom.setView({
        html: isDeskTopSize,
      })
    }
  }, [isDeskTopSize])

  return (
    <div className={classes.editor}>
      <MdEditor
        onChange={onChange}
        ref={mdEditor}
        renderHTML={(text) => (
          <Fragment>
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
