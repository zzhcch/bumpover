import { struct } from 'superstruct'
import { Bumpover } from '../../src'
import { match, trace } from '../utils'

const Node = struct({
  tag: struct.enum(['span', 'div']),
  children: 'array'
})

const rules = [
  {
    match: node => node.tag === 'div',
    update: node => new Promise((resolve, reject) => {
      resolve({
        node: { ...node, tag: 'span' }
      })
    }),
    struct: Node
  }
]

const input = {
  tag: 'div',
  children: [
    { tag: 'div', children: [] }
  ]
}

const expected = {
  tag: 'span',
  children: [
    { tag: 'span', children: [] }
  ]
}

const bumper = new Bumpover(rules)
bumper.bump(input).then(match(expected)).catch(trace)
