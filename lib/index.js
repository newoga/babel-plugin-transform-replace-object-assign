'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      Program: {
        exit: function exit(path, _ref2) {
          var file = _ref2.file;
          var opts = _ref2.opts;

          if (this.assign) {
            var declar = t.importDeclaration([t.importDefaultSpecifier(this.assign)], t.stringLiteral(opts));
            path.node.body.unshift(declar);
          }
        }
      },

      CallExpression: function CallExpression(path, _ref3) {
        var file = _ref3.file;

        if (path.get('callee').matchesPattern('Object.assign')) {
          this.assign = path.scope.generateUidIdentifier('assign');
          path.node.callee = this.assign;
        }
      }
    }
  };
};