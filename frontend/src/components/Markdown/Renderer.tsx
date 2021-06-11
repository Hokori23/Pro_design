/* eslint-disable react/display-name */
import React, { FC, HTMLAttributes } from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import classnames from 'classnames'
import Markdown, { TransformOptions } from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import inspectUrls from '@jsdevtools/rehype-url-inspector'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
/**
 *
 * okaidia(dark)
 * prism(light)
 * tomorrow(dark)
 * vs(ghcolors)(light)
 * darcula(dark)
 * atomDark
 */
interface RendererProps {
  content: string
  className?: HTMLAttributes<HTMLElement>['className']
}

const CustomComponents: TransformOptions['components'] = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        PreTag="div"
        // eslint-disable-next-line react/no-children-prop
        children={String(children).replace(/\n$/, '')}
        language={match[1]}
        style={okaidia}
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    )
  },
  h1: ({ node, ...props }) => (
    <Typography style={{ fontSize: '4.8em' }} variant="h1" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <Typography style={{ fontSize: '3.5em' }} variant="h2" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <Typography style={{ fontSize: '3em' }} variant="h3" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <Typography style={{ fontSize: '2.5em' }} variant="h4" {...props} />
  ),
  h5: ({ node, ...props }) => (
    <Typography style={{ fontSize: '2em' }} variant="h5" {...props} />
  ),
  h6: ({ node, ...props }) => (
    <Typography style={{ fontSize: '1.6em' }} variant="h6" {...props} />
  ),
  p: ({ node, ...props }) => (
    <Typography style={{ fontSize: '1.25em' }} variant="body1" {...props} />
  ),
}
const useStyles = makeStyles((theme) => ({
  markdown: {
    '& > pre': {
      padding: 0,
      backgroundColor: 'inherit',
    },
    '& code': {
      backgroundColor: 'inherit',
    },
  },
}))
export const Renderer: FC<RendererProps> = ({ content, className }) => {
  const classes = useStyles()
  return (
    <Markdown
      className={classnames(classes.markdown, className)}
      components={CustomComponents}
      rehypePlugins={[rehypeRaw, inspectUrls]}
      remarkPlugins={[[gfm, { singleTilde: false }]]}
    >
      {content}
    </Markdown>
  )
}
