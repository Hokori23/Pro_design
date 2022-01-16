/* eslint-disable react/display-name */
import React, { FC, HTMLAttributes, useEffect, useState } from 'react'
import { Typography, Divider } from '@mui/material'
import classnames from 'classnames'
import Markdown from 'react-markdown'
import Zmage, { Set } from 'react-zmage'
import 'react-zmage/lib/zmage.css'
import { Components } from 'react-markdown/src/ast-to-react'
import './renderer.less'
import { setUpYunImg } from '@/utils/tools'

// import { Element, Properties } from 'hast'
// import h from 'hastscript'

/**
 * plugins
 */

// @remark
import gfm from 'remark-gfm'

// @rehype
import rehypeRaw from 'rehype-raw'
import inspectUrls from '@jsdevtools/rehype-url-inspector'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Photos, { imgRegExp } from '@/components/Markdown/Plugins/Photos'
/**
 *
 * okaidia(dark)
 * prism(light)
 * tomorrow(dark)
 * vs(ghcolors)(light)
 * darcula(dark)
 * atomDark
 */

// hooks
import useStyles from './useStyles'

// components
// import rehypeComponents from 'rehype-components'
import Img from '../components/Img'
import A from '../components/A'

interface RendererProps {
  className?: HTMLAttributes<HTMLElement>['className']
  content: string
  outline?: boolean // 是否只渲染概览内容
}

// interface ComponentsProps {
//   [key: string]: unknown
//   node: Element
//   children: React.ReactNode[]
//   inline?: boolean
//   className?: string
//   key: string
//   sourcePosition?: Position | null
//   index?: number
//   siblingCount?: number
// }
interface CustomComponentsOptions {
  onImgClick?: (originSrc: string) => void
}
const CustomComponents = (
  outline?: boolean,
  { onImgClick }: CustomComponentsOptions = {},
): Components => ({
  code({ node, children, inline, className, ...props }) {
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
  img: ({ node, inline, src, ...props }) => (
    <Img
      inline={inline as boolean}
      onClick={onImgClick}
      outline={outline}
      src={src as string}
      {...props}
    />
  ),
  a: ({ node, ...props }) => <A outline={outline} {...props} />,
  hr: () => <Divider variant="middle" />,
})

export const Renderer: FC<RendererProps> = ({
  content,
  className,
  outline,
}) => {
  const classes = useStyles()
  const [imgs, setImgs] = useState<Set[]>([])

  useEffect(() => {
    let match
    const imgs: Set[] = []
    while ((match = imgRegExp.exec(content))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, alt, src] = match
      imgs.push({
        alt,
        src: setUpYunImg(src, 'origin'),
      })
    }
    setImgs(imgs)
  }, [content])

  return (
    <>
      <Markdown
        className={classnames(classes.markdown, className, 'markdown-renderer')}
        components={CustomComponents(outline, {
          onImgClick: (originSrc: string) => {
            const currentImgIdx = imgs.findIndex((v) => v?.src === originSrc)
            Zmage.browsing({
              set: imgs,
              defaultPage: currentImgIdx === -1 ? 0 : currentImgIdx,
            })
          },
        })}
        rehypePlugins={[
          rehypeRaw,
          inspectUrls,
          Photos,
          // [
          //   rehypeComponents,
          //   {
          //     components: {
          //       test: (properties: Properties, children: Element[]) => {
          //         return h('.test', children)
          //       },
          //     },
          //   },
          // ],
        ]}
        remarkPlugins={[[gfm, { singleTilde: false }]]}
      >
        {content}
      </Markdown>
    </>
  )
}
