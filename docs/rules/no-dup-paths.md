# each API path should be unique (`no-dup-paths`)

All API paths in a Swagger specification should be unique.

Uniqueness is not only based on **verbatim equality**, but also **functional equivalency**.


## Rule Details

This rule aims to ensure that API paths are literally and functionally unique.

### Examples of _incorrect_ code for this rule:

```js

{
  "paths": {
    "/pets/{id}": ...,
    "/pets/{id}": ...,
    "/pets/{chipId}": ...,
    "/pets/{petId}": ...,
    "/pets/{uuid}": ...
  }
}

```

### Examples of _correct_ code for this rule:

```js

{
  "paths": {
    "/pets/{petId}": ...
  }
}

```

## When Not To Use It

> ### :warning: This rule should always be enabled.

In cases where your API path has a param that needs functional distinction, add a `query` input qualifier, e.g.,

```http

GET /pets/{id}?idType=aaha
GET /pets/{id}?idType=petlink

```

For identifiers, create a [UUID][uuid-def-url] and create a model called `RegisteredId` that provides identifier semantics (if possible):

```http

GET /pets/{uuid}/registeredIds

```

Returns:

```js

[
  {
    "id": "11111111",
    "type": "aaha",
    "registrationAuthority": "American Animal Hospital Association",
    "validFrom": 1326261600000,
    "validTo": null
  },
  {
    "id": "22222222",
    "type": "petlink",
    "registrationAuthority": "Datamars",
    "validFrom": 1326261600000,
    "validTo": null
  }
]

```

## Further Reading

* [Rule source][rule-src-url]
* [Rule specs][rule-specs-url]
* [Documentation source][doc-src-url]

[doc-src-url]: ./docs/rules/no-dup-paths.md
[rule-specs-url]: ./tests/lib/rules/no-dup-paths.js
[rule-src-url]: ./lib/rules/no-dup-paths.js
[uuid-def-url]: https://en.wikipedia.org/wiki/Universally_unique_identifier
