import _find from 'unist-util-find'
import { Node } from 'unist'
import { Text, Element, Comment } from 'hast'

export const find = _find
const _deepFind = (
  node: Element | Node,
  condition: string | Object | Function,
  nodes: Array<Element | Text | Comment>,
) => {
  const res = find(node, condition)
  res && !nodes.includes(res) && nodes.push(res)
  ;((node as any).children as Array<Element | Text | Comment>).forEach(
    (node) => {
      if (node.type === 'element') _deepFind(node, condition, nodes)
    },
  )
  return nodes
}

export const deepFind = (
  tree: Node,
  condition: string | Object | Function,
): Array<Element | Text | Comment> => {
  const nodes: Array<Element | Text | Comment> = []
  return _deepFind(tree, condition, nodes)
}
