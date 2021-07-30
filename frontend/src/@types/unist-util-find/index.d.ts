import { Node } from 'unist'
import { Text, Element, Comment } from 'hast'

declare const find: (
  node: Element | Node,
  condition: string | Object | Function,
) => Element | Text | Comment

export = find
