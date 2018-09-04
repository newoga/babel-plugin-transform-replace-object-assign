# Changelog

## Unreleased changes

## 2.0.0

* Official support for stable babel v7! :tada:

* Chores (via #8):
  * Replaced deprecated `@babel/preset-es2015` with `@babel/preset-env`
  * Updated babel related dependencies to stable Babel v7 release
  * Updated other development dependencies (`mocha`, `all-contributors-cli`)

## 2.0.0-beta.0

* Via [#3](https://github.com/newoga/babel-plugin-transform-replace-object-assign/pull/3):
  * Updated dependencies.
  * New plugin implementation for Babel v7.
  * Use [@babel/helper-module-imports](https://npm.im/@babel/helper-module-imports) so the output is either ESM or CJS depending if `sourceType` is `module` or `script`, fixing [#1](https://github.com/newoga/babel-plugin-transform-replace-object-assign/issues/1).
  * Added [`@babel/core`](https://npm.im/@babel/core) peer dependency, as Babel does for official plugins.
  * Disabled and ignored `package-lock.json`.
  * Replaced `lodash.assign` in readme examples with `object-assign` to demo defaults.
  * New way to register Babel for Mocha tests.

## 1.0.0

* The plugin configuration is now optional. If no configuration is provided, the `Object.assign` implementation will be replaced with [object-assign](https://github.com/sindresorhus/object-assign).

  **This will replace `Object.assign` with `object-assign`:**

  ```json
  {
    "plugins": [["transform-replace-object-assign"]]
  }
  ```

* **Breaking change:** The plugin configuration no longer supports passing a `string` module name. If you want to provide a custom `Object.assign` implementation, you must provide an `object` config with the name of the module specified in the `moduleSpecifier` key.

  **This:**

  ```json
  {
    "plugins": [["transform-replace-object-assign", "custom-module"]]
  }
  ```

  **Should be changed to this:**

  ```json
  {
    "plugins": [
      [
        "transform-replace-object-assign",
        { "moduleSpecifier": "custom-module" }
      ]
    ]
  }
  ```

Thanks to [@jaydenseric](https://github.com/jaydenseric) for proposing these changes in preparation for babel `v7`.

## 0.2.1

There were no code changes in this release. This patch fixed some documentation errors in `README.md` so that it would show in the `npm` registry.

## 0.2.0

First release of this plugin! :smile:

View the [README.md](https://github.com/newoga/babel-plugin-transform-replace-object-assign/blob/v0.2.0/README.md) to learn how it works!
