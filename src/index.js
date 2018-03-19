import { addDefault } from '@babel/helper-module-imports'

export default function({ types: t }) {
  return {
    visitor: {
      CallExpression(path, { file, opts }) {
        if (path.get('callee').matchesPattern('Object.assign')) {
          const { moduleSpecifier = 'object-assign' } = opts

          if (this.importCache) path.node.callee = t.cloneNode(this.importCache)
          else {
            this.importCache = addDefault(file.path, moduleSpecifier, {
              nameHint: 'objectAssign'
            })

            path.node.callee = this.importCache
          }
        }
      }
    }
  }
}
