import visit from 'unist-util-visit'
import { Node } from 'unist'
import { Element } from 'hast'
import { deepFind } from './utils'

const tagName = 'photos' // 标签名
const className = 'photos'

export const imgRegExp = /!\[(.*?)\]\(((https?:)\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])\)/g
let match

const plugin = () => {
  function transformer(tree: Node) {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === tagName) {
        node.properties = { class: className }
        const children = deepFind(node, { type: 'text' }) as Element[]
        const newChildren: Element[] = []
        children.forEach((node) => {
          while ((match = imgRegExp.exec(node.value as string))) {
            newChildren.push({
              ...node,
              children: [],
              type: 'element',
              tagName: 'img',
              properties: { src: match[2], inline: true },
            })
          }
        })
        node.children = newChildren
      }
    })
  }

  return transformer
}

export default plugin
