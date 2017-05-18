# `eslint-plugin-swagger-tools`

> An extensible linter for Swagger/OpenAPI specifications.

[![Readme Score][readme-score-img]][readme-score-url] [![Build Status][travis-ci-img]][travis-ci-url] [![NSP Status][nsp-img]][nsp-url] [![Codacy Badge][codacy-img]][codacy-url]

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

1. [`plural-paths`][rule-plural-paths-url]: Require API paths to use plural nouns for all resources.

## License

[Apache 2.0][license-url] :copyright: [Greg Swindle][author-url].

---

[![Greenkeeper badge][greenkeeper-img]][greenkeeper-url]


[author-url]: https://github.com/gregswindle
[codacy-img]: https://api.codacy.com/project/badge/Grade/554fe390431b455a87ba6acde3ff2989
[codacy-url]: https://www.codacy.com/app/greg_7/eslint-plugin-swagger-tools?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gregswindle/eslint-plugin-swagger-tools&amp;utm_campaign=Badge_Grade
[inch-ci-img]:
[inch-ci-url]:
[license-url]: ./LICENSE
[greenkeeper-img]: https://badges.greenkeeper.io/gregswindle/eslint-plugin-swagger-tools.svg
[greenkeeper-url]: https://greenkeeper.io/
[nsp-img]: https://nodesecurity.io/orgs/gregswindle/projects/ebd8d503-2827-4444-a66e-c9b228bfa1c3/badge
[nsp-url]: https://nodesecurity.io/orgs/gregswindle/projects/ebd8d503-2827-4444-a66e-c9b228bfa1c3
[readme-score-img]: http://readme-score-api.herokuapp.com/score.svg?url=https://github.com/gregswindle/eslint-plugin-swagger-tools
[readme-score-url]: http://clayallsopp.github.io/readme-score?url=https://github.com/gregswindle/eslint-plugin-swagger-tools
[rule-plural-paths-url]: ./docs/rules/plural-paths.md
[travis-ci-img]: https://travis-ci.org/gregswindle/eslint-plugin-swagger-tools.svg?branch=develop
[travis-ci-url]:  https://travis-ci.org/gregswindle/eslint-plugin-swagger-tools
