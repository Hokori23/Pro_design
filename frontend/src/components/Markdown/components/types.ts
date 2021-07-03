import { Position } from 'react-markdown/src/ast-to-react'

export interface RenderProps {
  [key: string]: unknown
  className?: string
  key: string
  children: React.ReactNode[]
  sourcePosition?: Position | null
  index?: number
  siblingCount?: number
}
