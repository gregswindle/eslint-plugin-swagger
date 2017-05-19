# Require API paths to use plural nouns for all resources (`plural-paths`)

The `plural-paths` rule enforces consistent usage of plural nouns for all resources.


## Rule Details

This rule ensures that all resources within an API path use the plural case.

Examples of **incorrect** code for this rule:

```js

/pet/{uuid}
/store/{storeId}/inventory
/user/{uuid}/order/{orderId}

```

Examples of **correct** code for this rule:

```js

/pets/{uuid}
/stores/{storeId}/inventory
/users/{uuid}/orders/{orderId}

```

> #### :mega: Parameters are not pluralized
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
> **Note that in both examples, the grammatical categorization of the  `{orderId}` parameter did not change.**


### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
