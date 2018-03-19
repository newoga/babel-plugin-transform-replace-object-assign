"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _helperModuleImports = require("@babel/helper-module-imports");

var OBJECT_ASSIGN = 'ObjectAssign';

function _default(_ref) {
  var t = _ref.types;
  return {
    visitor: {
      Program: {
        enter: function enter(path, _ref2) {
          var file = _ref2.file;
          file.set(OBJECT_ASSIGN, false);
        },
        exit: function exit(path, _ref3) {
          var file = _ref3.file,
              opts = _ref3.opts;

          if (!file.get(OBJECT_ASSIGN) && !path.scope.hasBinding(opts)) {
            return;
          }

          var _opts$moduleSpecifier = opts.moduleSpecifier,
              moduleSpecifier = _opts$moduleSpecifier === void 0 ? 'object-assign' : _opts$moduleSpecifier;
          (0, _helperModuleImports.addDefault)(file.path, moduleSpecifier, {
            nameHint: file.get(OBJECT_ASSIGN)
          });
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
}