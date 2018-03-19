## babel-plugin-transform-replace-object-assign
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)
[![Build Status](https://travis-ci.org/newoga/babel-plugin-transform-replace-object-assign.svg?branch=master)](https://travis-ci.org/newoga/babel-plugin-transform-replace-object-assign)
[![npm version](https://img.shields.io/npm/v/babel-plugin-transform-replace-object-assign.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-transform-replace-object-assign)
[![npm downloads](https://img.shields.io/npm/dm/babel-plugin-transform-replace-object-assign.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-transform-replace-object-assign)

Replaces `Object.assign` with a custom implementation that you provide in plugin configuration. This plugin works similarly to the [babel-plugin-transform-object-assign](https://www.npmjs.com/package/babel-plugin-transform-object-assign) plugin except it allows you to provide your own implementation that you would like to replace `Object.assign` with rather than the `_extends` helper that Babel uses.

Also, this plugin will import an external package in files where `Object.assign` is used rather than redeclaring the function in each file (which should help reduce bundle size). This is ultimately what [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) does for you when using the `_extends` helper.

The implementation you configure is specified as a npm package dependency.

---

#### ⚠️ Important note on the use of this project:

Most likely you do not and should not use this plugin! I initially wrote this plugin due to a [bug](https://bugs.chromium.org/p/v8/issues/detail?id=4118) in Chrome where key order was not gaurenteed to be correct for objects mutated with `Object.assign` (the issue is also described at [sindresorhus/object-assign#22](https://github.com/sindresorhus/object-assign/issues/22)).

While the bug did not cause problems for most projects, it did causes problems for a project I was helping maintain ([Material-UI](https://github.com/callemall/material-ui)). We heavily used `Object.assign` to merge style definitions that were defined in javascript objects. Since key order is important when defining CSS style rules, the `Object.assign` implementation built into Chrome caused many style related bugs. This plugin allowed us to completely replace all uses of `Object.assign` within our source code with an implementation that did not break in Chrome (with the expectation that we would stop using this plugin when the bug was fixed and rolled out to a majority of Chrome users).

The bug in Chrome has been fixed for quite some time now (it was fixed in Chrome 49), so this plugin is no longer necessary for the purpose it was originally created for. We have also stopped using this plugin for Material-UI. Please **carefully** consider the necessity and implications of replacing all of your `Object.assign` calls before using this plugin. If you are not sure if you need this, feel free to open an issue to discuss it.

---

### Usage

#### Installation

```sh
# Install the plugin
$ npm install --save-dev babel-plugin-transform-replace-object-assign

# Install an assign implementation
$ npm install object-assign
```

#### Configure

When you provide the plugin, use the `moduleSpecifier` option to specify which package you would like imported and used when replacing `Object.assign`.

**.babelrc**

```json
{
  "plugins": [
    ["transform-replace-object-assign", { "moduleSpecifier": "object-assign" }]
  ]
}
```

To use defaults (which is the same as above):

```json
{
  "plugins": ["transform-replace-object-assign"]
}
```

#### Result

**In**

```js
Object.assign(a, b);
```

**Out**

```js
import _objectAssign from 'object-assign';

_objectAssign(a, b);
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/344018?v=4" width="100px;"/><br /><sub><b>Neil Gabbadon</b></sub>](https://github.com/newoga)<br />[💻](https://github.com/newoga/babel-plugin-transform-replace-object-assign/commits?author=newoga "Code") [📖](https://github.com/newoga/babel-plugin-transform-replace-object-assign/commits?author=newoga "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/389286?v=4" width="100px;"/><br /><sub><b>Ivan Nikolić</b></sub>](http://ivannikolic.com)<br />[🐛](https://github.com/newoga/babel-plugin-transform-replace-object-assign/issues?q=author%3Aniksy "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/45469?v=4" width="100px;"/><br /><sub><b>Jordan Harband</b></sub>](https://twitter.com/ljharb)<br />[🤔](#ideas-ljharb "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/1754873?v=4" width="100px;"/><br /><sub><b>Jayden Seric</b></sub>](https://jaydenseric.com)<br />[💻](https://github.com/newoga/babel-plugin-transform-replace-object-assign/commits?author=jaydenseric "Code") [📖](https://github.com/newoga/babel-plugin-transform-replace-object-assign/commits?author=jaydenseric "Documentation") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!