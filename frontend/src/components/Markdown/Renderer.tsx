/* eslint-disable react/display-name */
import React, { FC, HTMLAttributes } from 'react'
import { Typography } from '@material-ui/core'
import Markdown, { TransformOptions } from 'react-markdown'

interface RendererProps {
  content: string
  className?: HTMLAttributes<HTMLElement>['className']
}

const CustomComponents: TransformOptions['components'] = {
  h1: ({ node, ...props }) => (
    <Typography style={{ fontSize: '6em' }} variant="h1" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <Typography style={{ fontSize: '3.75em' }} variant="h2" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <Typography style={{ fontSize: '3em' }} variant="h3" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <Typography style={{ fontSize: '2.125em' }} variant="h4" {...props} />
  ),
  h5: ({ node, ...props }) => (
    <Typography style={{ fontSize: '1.5em' }} variant="h5" {...props} />
  ),
  h6: ({ node, ...props }) => (
    <Typography style={{ fontSize: '1.25em' }} variant="h6" {...props} />
  ),
  p: ({ node, ...props }) => (
    <Typography style={{ fontSize: '1em' }} variant="body1" {...props} />
  ),
}
export const Renderer: FC<RendererProps> = ({ content, className }) => {
  return (
    <Markdown className={className} components={CustomComponents}>
      {content}
    </Markdown>
  )
}
