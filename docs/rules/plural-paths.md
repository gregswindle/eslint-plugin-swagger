# Require API paths to use plural nouns for all resources (plural-paths)

Most resources model collections of data. Enforce consistent use of plural nouns for all resources.


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

/pet/{uuid}

```

Examples of **correct** code for this rule:

```js

/pets/{uuid}

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
