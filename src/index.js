import { addDefault } from "@babel/helper-module-imports"

const OBJECT_ASSIGN = 'ObjectAssign';

export default function({types: t}) {
  return {
    visitor: {
      Program: {
        enter(path, {file}) {
          file.set(OBJECT_ASSIGN, false);
        },

        exit(path, {file, opts}) {
          if (!file.get(OBJECT_ASSIGN) && !path.scope.hasBinding(opts)) {
            return;
          }

          const { moduleSpecifier = 'object-assign' } = opts

          addDefault(
            file.path,
            moduleSpecifier,
            {nameHint: file.get(OBJECT_ASSIGN)}
          )
        }
      },

      CallExpression(path, {file}) {
        if (path.get('callee').matchesPattern('Object.assign')) {

          if (!file.get(OBJECT_ASSIGN)) {
            file.set(OBJECT_ASSIGN, path.scope.generateUidIdentifier('objectAssign'));
          }

          path.node.callee = file.get(OBJECT_ASSIGN);
        }
      }
    }
  };
}
