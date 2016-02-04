## babel-plugin-transform-replace-object-assign
[![Build Status](https://travis-ci.org/newoga/babel-plugin-transform-replace-object-assign.svg?branch=master)](https://travis-ci.org/newoga/babel-plugin-transform-replace-object-assign)
[![npm version](https://img.shields.io/npm/v/babel-plugin-transform-replace-object-assign.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-transform-replace-object-assign)
[![npm downloads](https://img.shields.io/npm/dm/babel-plugin-transform-replace-object-assign.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-transform-replace-object-assign)

Replaces `Object.assign` with a custom implementation that you provide in plugin configuration. This plugin works similarly to the [babel-plugin-transform-object-assign](https://www.npmjs.com/package/babel-plugin-transform-object-assign) plugin except it allows you to provide your own implementation that you would like to replace `Object.assign` with rather than the `_extends` helper that Babel uses.

Also, this plugin will import an external package in files where `Object.assign` is used rather than redeclaring the function in each file (which should help reduce bundle size). This is ultimately what [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) does for you when using the `_extends` helper.

The implementation you configure is specified as a npm package dependency.

### Usage

#### Installation

```sh
# Install the plugin
$ npm install babel-plugin-transform-replace-object-assign

# Install an assign implementation
$ npm install lodash.assign
```

#### Configure

When you provide the plugin, also specify which package you would like imported and used when replacing `Object.assign`.

**.babelrc**

```json
{
  "plugins": [
    ["transform-replace-object-assign", "lodash.assign"]
  ] 
}
```

#### Result

**In**

```js
Object.assign(a, b);
```

**Out**

```js
import _lodash from 'lodash.assign';

_lodash(a, b)

```
