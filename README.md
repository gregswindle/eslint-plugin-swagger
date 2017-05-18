# `eslint-plugin-swagger-tools`

> An extensible linter for Swagger/OpenAPI specifications.

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

* Fill in provided rules here

## License

[Apache 2.0][license-url] :copyright: [Greg Swindle][author-url].


[license-url]: ./LICENSE
[author-url]: https://github.com/gregswindle
