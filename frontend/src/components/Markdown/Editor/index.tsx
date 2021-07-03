/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, Fragment, useEffect, useRef } from 'react'
import MdEditor, { Plugins } from 'react-markdown-editor-lite'
import { Renderer } from '../Renderer'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import '@/static/react-markdown-editor-lite.less'

// components
import { Title } from './Title'
import { UploadFunc } from 'react-markdown-editor-lite/share/var'

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
// 注册默认插件
const {
  Header,
  FontBold,
  FontItalic,
  FontUnderline,
  FontStrikethrough,
  ListUnordered,
  ListOrdered,
  BlockQuote,
  BlockWrap,
  BlockCodeInline,
  BlockCodeBlock,
  Table,
  Image,
  Link,
  Clear,
  Logger,
  ModeToggle,
  FullScreen,
  AutoResize,
  TabInsert,
} = Plugins
MdEditor.unuse(FontBold)
MdEditor.unuse(FontItalic)
MdEditor.unuse(FontUnderline)
MdEditor.unuse(FontStrikethrough)
MdEditor.unuse(ListUnordered)
MdEditor.unuse(ListOrdered)
MdEditor.unuse(BlockCodeInline)
MdEditor.unuse(Logger)
MdEditor.use(TabInsert)
MdEditor.use(Logger)

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
  onImgUpload?: UploadFunc
}

let _content: string | undefined
let _timer: number | NodeJS.Timeout = -1
export const Editor: FC<EditorProps> = ({
  title,
  coverUrl,
  content,
  onChange,
  onImgUpload,
}) => {
  const mdEditor = useRef(null)
  const classes = useStyles()
  const theme = useTheme()
  const isDeskTopSize = useMediaQuery(theme.breakpoints.up('sm'))

  // 移动端自动关闭预览区
  useEffect(() => {
    if (mdEditor.current) {
      const mdDom = (mdEditor.current as unknown) as MdEditor
      mdDom.setView({
        html: isDeskTopSize,
      })
    }
  }, [isDeskTopSize])

  useEffect(() => {
    if (content.replaceAll(' ', '') !== _content) _content = content
  }, [content])
  useEffect(() => {
    if (mdEditor.current) {
      const mdDom = (mdEditor.current as unknown) as MdEditor
      mdDom.setText((_content as string) + ' ') // 强制触发渲染
      if (_timer === -1) {
        _timer = setTimeout(() => {
          mdDom.setText(_content) // 复原content值
          _timer = -1
        }, 100)
      }
    }
  }, [coverUrl, title])

  useEffect(() => {
    return () => {
      _timer !== -1 && clearTimeout(_timer as NodeJS.Timeout)
    }
  }, [])

  return (
    <div className={classes.editor}>
      <MdEditor
        onChange={onChange}
        onImageUpload={onImgUpload}
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
