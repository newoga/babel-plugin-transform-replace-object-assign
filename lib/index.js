'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      Program: {
        enter: function enter(path, _ref2) {
          var file = _ref2.file;

          file.set(OBJECT_ASSIGN, false);
        },
        exit: function exit(path, _ref3) {
          var file = _ref3.file;
          var opts = _ref3.opts;

          if (!file.get(OBJECT_ASSIGN) && !path.scope.hasBinding(opts)) {
            return;
          }

          var declar = t.importDeclaration([t.importDefaultSpecifier(file.get(OBJECT_ASSIGN))], t.stringLiteral(opts));

          path.node.body.unshift(declar);
        }
      },

      CallExpression: function CallExpression(path, _ref4) {
        var file = _ref4.file;

        if (path.get('callee').matchesPattern('Object.assign')) {

          if (!file.get(OBJECT_ASSIGN)) {
            file.set(OBJECT_ASSIGN, path.scope.generateUidIdentifier('objectAssign'));
          }

          path.node.callee = file.get(OBJECT_ASSIGN);
        }
      }
    }
  };
};

var OBJECT_ASSIGN = 'ObjectAssign';