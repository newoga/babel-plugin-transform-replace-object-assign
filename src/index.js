export default function ({types: t}) {
  return {
    visitor: {
      Program: {
        exit(path, {file, opts}) {
          if (this.assign) {
            const declar = t.importDeclaration([
              t.importDefaultSpecifier(this.assign),
            ], t.stringLiteral(opts));
            path.node.body.unshift(declar);
          }
        }
      },

      CallExpression(path, {file}) {
        if (path.get('callee').matchesPattern('Object.assign')) {
          this.assign = path.scope.generateUidIdentifier('assign');
          path.node.callee = this.assign;
        }
      }
    }
  };
}
