# prohibit use of verbs in api paths (`no-path-verbs`)
> Evaluate whether your service conforms with Level 2 of the Richardson Maturity Model.

Mature RESTful designs represent

* **Resources** as **HTTP paths** and
* **Operations** available for resources as **HTTP methods**.

## Traditional, non-RESTful operations

Traditional `RPC` and `SOAP` calls expose procedure and method calls for CRUD operations. When `RPC`s and `SOAP` rarely take HTTP method types into consideration beyond data exchange (e.g., sending data in HTTP request and response bodies).

| HTTP method type (verb) | CRUD | Collection<br>(e.g., `/pets`) | Item<br>(e.g., `/pets/{id}`) |
|:------------------------|:-----|:---------- |:---- |
| POST | Create | `/pets/createPets` | `/pets/createPet` |
| GET | Read | `/pets/getAllPets` | `/pets/getPetById` |
| POST | Update/Replace | `/pets/updateAllPets` | `/pets/updateById` |
| POST | Update/Modify | `/pets/updateBreed` | `/pets/updateBreedById` |
| POST | Delete | `/pets/deleteAllPets` | `/pets/deletePetsByBreed` |

## RESTful API verbs represented by HTTP method type

RESTful APIs standardize resource operations, e.g., `find`, `get`, `create`, `update`, with HTTP method method types.

| HTTP method type (verb) | CRUD | Collection<br>(e.g., `/pets`) | Item<br>(e.g., `/pets/{id}`) |
|:------------------------|:-----|:---------- |:---- |
| POST | Create | `201 Created` | `404 Not Found`<br>`409 Conflict` (if resource already exists) |
| GET | Read | `200 OK` | `200 OK`<br>`404 Not Found` (if resource doesn't exist or invalid) |
| PUT | Update/Replace | `405 Method Not Allowed` (unless replacement of every resource is allowed) | `200 OK`<br>`204 No Content`<br>`404 Not Found` |
| PATCH | Update/Modify | `405 Method Not Allowed` (unless you allow modification of the entire collection) | `200 OK`<br>`204 No Content`<br>`404 Not Found` (if ID not found or invalid) |
| DELETE | Delete | `405 Method Not Allowed` (unless you want to delete the whole collection; not often desirable) | `404 Not Found`<br>`200 OK`<br>`404 Not Found` (if ID not found or invalid) |


## Rule Details

This rule evaluates API paths for

1. Common (English) verbs
2. Resources with names identical to its operation

### Examples of _incorrect_ code for this rule:

#### Common verb violations

```js

{
  "paths": {
    "/pets/findByStatus": ...,
    "/pets/findByTags": ...,
    "/users/createWithArray": ...,
    "/users/createWithList": ...
  }
}

```

#### Paths that contain their `operation`'s name

```js

{
  "paths": {
    "/pets/{petId}/uploadImage": ...,
    "/users/login": ...,
    "/users/logout": ...
  }
}

```

### Examples of _correct_ code for this rule:

```js

{
  "paths": {
    "/pets": ...,  // with <query> input params
    "/pets": ...,  // with <query> input params
    "/pets/{petId}/images": ..., // with uploadImage method
    "/users": ..., // with overloaded operation
    "/users": ..., // with overloaded operation
    "/users/{id}/sessions": ..., // POST
    "/users/{id}/sessions": ...  // DELETE
  }
}

```

## When Not To Use It

Disable this rule _only_ in cases of backwards compatibility.

> ### :neckbeard: Richardson Maturity Model (RMM) Level 2
>
> Disabling this rule will affect your RESTful service's maturity level, and your service will not, by definition, achieve [Level 2, "HTTP Verbs"][rmm-level-2-url].

## Version

The `no-path-verbs` rule was introduced to `eslint-plugin-swagger-tools` in version `0.2.0`.

## Further Reading

* [Documentation source][doc-src-url]
* [Rule source][rule-src-url]
* [Richardson Maturity Model: steps toward the glory of REST][rmm-url]

[doc-src-url]: ./docs/rules/no-path-verbs.md
[rule-src-url]: ./lib/rules/no-path-verbs.js
[rmm-url]: https://martinfowler.com/articles/richardsonMaturityModel.html
[rmm-level-2-url]: https://martinfowler.com/articles/richardsonMaturityModel.html#level2
