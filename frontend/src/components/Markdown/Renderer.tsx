/* eslint-disable react/display-name */
import React, { FC, HTMLAttributes } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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

// components
import { CardMedia } from '@/components/CardMedia'

interface RendererProps {
  className?: HTMLAttributes<HTMLElement>['className']
  content: string
  outline?: boolean
}

const useCustomComponentsStyles = makeStyles((theme) => ({
  media: {
    height: '33vh',
  },
  mediaInner: {
    maxHeight: '33vh',
  },
}))
const CustomComponents = (
  outline?: boolean,
): TransformOptions['components'] => ({
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
    <Typography gutterBottom variant="h1" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <Typography gutterBottom variant="h2" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <Typography gutterBottom variant="h3" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <Typography gutterBottom variant="h4" {...props} />
  ),
  h5: ({ node, ...props }) => (
    <Typography gutterBottom variant="h5" {...props} />
  ),
  h6: ({ node, ...props }) => (
    <Typography gutterBottom variant="h6" {...props} />
  ),
  p: ({ node, ...props }) => (
    <Typography component="div" gutterBottom variant="body1" {...props} />
  ),
  img: ({ node, ...props }) => {
    const classes = useCustomComponentsStyles()
    return outline ? null : (
      <CardMedia
        {...props}
        className={classes.media}
        innerClassName={classes.mediaInner}
      />
    )
  },
  a: ({ node, ...props }) => {
    return outline ? <span>{props.children}</span> : <a {...props}></a>
  },
})
const useStyles = makeStyles((theme) => ({
  markdown: {
    '& > pre': {
      padding: 0,
      backgroundColor: 'inherit',
    },
    '& code': { backgroundColor: 'inherit' },
    '& img': { maxWidth: '100%' },
    '& h1': { fontSize: '2.1rem' },
    '& h2': { fontSize: '1.55rem' },
    '& h3': { fontSize: '1.3rem' },
    '& h4': { fontSize: '1.1rem' },
    '& h5, & p': { fontSize: '1rem' },
    '& h6': { fontSize: '1rem', color: theme.palette.text.disabled },
  },
}))
export const Renderer: FC<RendererProps> = ({
  content,
  className,
  outline,
}) => {
  const classes = useStyles()
  return (
    <Markdown
      className={classnames(classes.markdown, className)}
      components={CustomComponents(outline)}
      rehypePlugins={[rehypeRaw, inspectUrls]}
      remarkPlugins={[[gfm, { singleTilde: false }]]}
    >
      {content}
    </Markdown>
  )
}
