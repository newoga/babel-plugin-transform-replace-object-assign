"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _helperModuleImports = require("@babel/helper-module-imports");

function _default(_ref) {
  var t = _ref.types;
  return {
    visitor: {
      CallExpression: function CallExpression(path, _ref2) {
        var file = _ref2.file,
            opts = _ref2.opts;

        if (path.get('callee').matchesPattern('Object.assign')) {
          if (this.importCache) path.node.callee = t.cloneNode(this.importCache);else {
            var _opts$moduleSpecifier = opts.moduleSpecifier,
                moduleSpecifier = _opts$moduleSpecifier === void 0 ? 'object-assign' : _opts$moduleSpecifier;
            this.importCache = (0, _helperModuleImports.addDefault)(file.path, moduleSpecifier);
            path.node.callee = this.importCache;
          }
        }
      }
    }
  };
}