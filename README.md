## objectStringFind

### Find substring or match regexp in the object and his inner objects.

### Install

```sh
npm i object-str-find
```

or

```sh
yarn add object-str-find
```

### Why?

It helps when you want to fastly check out some hypothesis about data content.

### How?

- Get all string properties (including inner objects)
- Trying to find substrings (**case insensitive**)
- Trying to match regexp (**case sensitive**)

### Results format

It is an array of objects {path, found, value} **where**:

- **Path** - property name (including parent properties)
- **Found** - an array of searching tokens which match with the value
- **Value** - property value

### Usage

**Find substring**:

```js
const data = {
  prop1: null,
  prop2: {
    innerProp1: 'First test',
    innerProp2: '"Another case"',
  },
}

const result = objectStringFind(data, 'test')
console.log(result)
// [{ path: 'prop2.innerProp1', found: ['test'], value: 'First test' }]
```

**Match regexp**:

```js
const data = {
  prop1: null,
  prop2: {
    innerProp1: 'First test',
    innerProp2: '"Another case"',
  },
}

const result = objectStringFind(data, /(")(.)+(")/g)
console.log(result)
// [{ path: 'prop2.innerProp2', found: [/(")(.)+(")/g], value: '"Another case"' }]
```

**Mixed mode**:

```js
const data = {
  prop1: null,
  prop2: {
    innerProp1: 'First test',
    innerProp2: '"Another case"',
    innerProp3: '1600s',
  },
}

const result = objectStringFind(data, [
  'test',
  /(")(.)+(")/g,
  'case',
  /(\d){4}(s)/g,
])
console.log(result)
//   [
//     { path: 'prop2.innerProp1', found: ['test'], value: 'First test' },
//     {
//       path: 'prop2.innerProp2',
//       found: [/(")(.)+(")/g, 'case'],
//       value: '"Another case"',
//     },
//     { path: 'prop2.innerProp3', found: [/(\d){4}(s)/g], value: '1600s' },
//   ]
```
