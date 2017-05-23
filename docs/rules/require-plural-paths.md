# Require plural nouns in API paths (`require-plural-paths`)

> The `require-plural-paths` rule enforces consistent usage of plural nouns for all resources.

## Rule Details

Mature RESTful designs represent

* HTTP **paths as resources** and
* HTTP **methods as operations** available for those resources.

For example, we might represent a customer and her purchase orders:

```json

// let customer =
{
  "id":"d5e124d9",
  "orders":[
    {
      "id":"1330334826",
      "items":[
        {
          "name":"Women's Lace Trim Half Sleeve Floral Print Top Skirt"
        }
      ]
    }
  ]
}
```

In object-oriented languages, we commonly use "dot" syntax to access the items she purchased in a single order:

```javascript

const productsOrdered = customer.orders[0].items;
```

REST allows us to use a similar syntax for accessing (and modifying) an object's properties with HTTP. **Instead of using "dot" syntax, however, we use URI paths (aka, "resources"):**

```shell

GET /customers/d5e124d9/orders/1330334826/items
```

Whether we use dots (OOP) or slashes (HTTP), we represent `customers` using the same words: we use a common _interface_. An interface simply allows us to reference lots of different data using the same terminology. Therefore, interfaces can be seen as collections of data with a contractural nomenclature. Given this point of view, most RESTful API conventions recommend plural nouns in API paths.

> #### :neckbeard: REST API debates
> Whether or not a convention recommends singular or plural nouns, almost all guidelines stress _consistency_ and _resource uniformity_.

### Examples of **incorrect** code for this rule

:x: The `require-plural-paths` rule throws an error whenever `swaggerApi.path` definitions use singular nouns instead of plural:

```js

/pet/{uuid}
/store/{id}/inventory
/user/{uuid}/order/{id}

```

### Examples of **correct** code for this rule

:white_check_mark: The `require-plural-paths` rule validates `swaggerApi.paths` with resources that use the plural case:

```js

/pets/{uuid}
/stores/{id}/inventory
/users/{uuid}/orders/{id}

```

> #### :information_source: API path _parameters_ are not pluralized
>
> `Parameters` -- resources with dynamic values -- are not validated for plural case. For example, the following resource _literals_ are invalid:
> ```
>
> /store/order/{orderId}
> ```
> Per style guidelines, the correct representation is
> ```
>
> /stores/orders/{orderId}
> ```
> :pencil: **Note that in both examples, the grammatical categorization of the  `{orderId}` parameter did not change.**

## When Not To Use It

Disable this rule if your product's style guidelines

* Require singular nouns instead of plural, or
* Provide unambiguous and testable instructions for singular _and_ plural noun use cases

## Version

The `require-plural-paths` rule was introduced to `eslint-plugin-swagger-tools` in version `0.1.0`.

## Further Reading

### Sources

* [Documentation source][docs-source-url]
* [Rule source][rule-source-url]

### Resources

* [REST API Tutorial's section on "Pluralization"][rest-api-tutorial-url]
* [RESTful API Design. Best Practices in a Nutshell: "Use Consistently Plural Nouns"][use-consistently-plural-nouns]
* [RESTful API Design: plural nouns and concrete names][restful-api-design-url]

[rule-source-url]: https://github.com/gregswindle/eslint-plugin-swagger-tools/blob/master/lib/rules/require-plural-paths.js
[docs-source-url]: https://github.com/gregswindle/eslint-plugin-swagger-tools/blob/master/docs/rules/require-plural-paths.md
[rest-api-tutorial-url]: http://www.restapitutorial.com/lessons/restfulresourcenaming.html#pluralization
[restful-api-design-url]: https://apigee.com/about/blog/technology/restful-api-design-plural-nouns-and-concrete-names
[use-consistently-plural-nouns]: https://blog.philipphauer.de/restful-api-design-best-practices/#use-consistently-plural-nouns
