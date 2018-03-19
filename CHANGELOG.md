# Changelog

## Unreleased changes

## 1.0.0

* The plugin configuration is now optional. If no configuration is provided, the `Object.assign` implementation will be replaced with [object-assign](https://github.com/sindresorhus/object-assign).

  **This will replace `Object.assign` with `object-assign`:**
  ```json
  {
    "plugins": [
      ["transform-replace-object-assign"]
    ]
  }
  ```
* **Breaking change:** The plugin configuration no longer supports passing a `string` module name. If you want to provide a custom `Object.assign` implementation, you must provide an `object` config with the name of the module specified in the `moduleSpecifier` key.

  **This:**

  ```json
  {
    "plugins": [
      ["transform-replace-object-assign", "custom-module"]
    ]
  }
  ```
  **Should be changed to this:**

  ```json
  {
    "plugins": [
      ["transform-replace-object-assign", { "moduleSpecifier": "custom-module}" }]
    ]
  }
  ```

Thanks to [@jaydenseric](https://github.com/jaydenseric) for proposing these changes in preparation for babel `v7`.

## 0.2.1

There were no code changes in this release. This patch fixed some documentation errors in `README.md` so that it would show in the `npm` registry.

## 0.2.0

First release of this plugin! :smile:

View the [README.md](https://github.com/newoga/babel-plugin-transform-replace-object-assign/blob/v0.2.0/README.md) to learn how it works!
