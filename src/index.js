import { addDefault } from '@babel/helper-module-imports';

export default function({ types: t }) {
  return {
    visitor: {
      CallExpression(path, { file, opts }) {
        if (path.get('callee').matchesPattern('Object.assign')) {
          if (this.importCache)
            path.node.callee = t.cloneNode(this.importCache);
          else {
            const { moduleSpecifier = 'object-assign' } = opts;
            this.importCache = addDefault(file.path, moduleSpecifier);
            path.node.callee = this.importCache;
          }
        }
      }
    }
  };
}
