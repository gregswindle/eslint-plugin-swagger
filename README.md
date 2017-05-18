# `eslint-plugin-swagger-tools`

> An extensible linter for Swagger/OpenAPI specifications.

## Table of contents

<!-- TOC depthFrom:2 depthTo:4 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Supported Rules](#supported-rules)
- [License](#license)

<!-- /TOC -->

## Installation

You'll first need to install [`ESLint`](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-swagger-tools`:

```
$ npm install eslint-plugin-swagger-tools --save-dev
```

**Note:** If you installed `ESLint` globally (using the `-g` flag) then you must also install `eslint-plugin-swagger-tools` globally.

## Usage

Add `swagger-tools` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "swagger-tools"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "swagger-tools/rule-name": 2
    }
}
```

## Supported Rules

* [`plural-paths`][rule-plural-paths-url]: Require API paths to use plural nouns for all resources

## License

[Apache 2.0][license-url] :copyright: [Greg Swindle][author-url].

---

[![Greenkeeper badge][greenkeeper-img]][greenkeeper-url]


[author-url]: https://github.com/gregswindle
[license-url]: ./LICENSE
[greenkeeper-img]: https://badges.greenkeeper.io/gregswindle/eslint-plugin-swagger-tools.svg
[greenkeeper-url]: https://greenkeeper.io/
[rule-plural-paths-url]: ./docs/rules/plural-paths.md
