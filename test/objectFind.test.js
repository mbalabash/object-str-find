const test = require('ava')
const objectStringFind = require('../src/objectStringFind')

const mockObj = require('./__mock__/mockData')

test('should correctly find values in object', (t) => {
  t.deepEqual(objectStringFind(mockObj, 'zxc'), [
    {
      path: 'prop6.innerProp1',
      found: ['zxc'],
      value: 'qwe test asd zxc',
    },
  ])
  t.deepEqual(objectStringFind(mockObj, ['test', 'etc', 'ipsum']), [
    {
      path: 'prop3',
      found: ['ipsum'],
      value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      path: 'prop4',
      found: ['ipsum'],
      value:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English.',
    },
    { path: 'prop6.innerProp1', found: ['test'], value: 'qwe test asd zxc' },
    {
      path: 'prop6.innerProp2',
      found: ['etc', 'ipsum'],
      value:
        'The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    },
    {
      path: 'prop6.innerProp5',
      found: ['ipsum'],
      value:
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    },
  ])
  t.deepEqual(objectStringFind(mockObj, /1123/g), [
    { path: 'prop1', found: [/1123/g], value: '1123' },
  ])
  t.deepEqual(
    objectStringFind(mockObj, [
      /^(\d){4}/g,
      'test',
      /(\d){1}\.(\d){1,2}.(\d){1,2}/g,
      /(\d){4}(s)/g,
      /(")(.)+(")/g,
    ]),
    [
      { path: 'prop1', found: [/^(\d){4}/g], value: '1123' },
      {
        path: 'prop4',
        found: [/(")(.)+(")/g],
        value:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English.',
      },
      { path: 'prop6.innerProp1', found: ['test'], value: 'qwe test asd zxc' },
      {
        path: 'prop6.innerProp5',
        found: [/(\d){1}\.(\d){1,2}.(\d){1,2}/g, /(\d){4}(s)/g, /(")(.)+(")/g],
        value:
          'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      },
    ],
  )
})

test('should return empty result', (t) => {
  t.deepEqual(objectStringFind(new Date(), 'zxc'), [])
  t.deepEqual(objectStringFind(new RegExp(), 'zxc'), [])
  t.deepEqual(objectStringFind([], 'zxc'), [])
  t.deepEqual(objectStringFind({}, 'zxc'), [])
  t.deepEqual(objectStringFind(Object.create(null), 'zxc'), [])
})

test('should throw an error', (t) => {
  t.throws(() => objectStringFind(null, 'zxc'))
  t.throws(() => objectStringFind(undefined, 'zxc'))
  t.throws(() => objectStringFind(1123, 'zxc'))
  t.throws(() => objectStringFind('qwe', 'zxc'))
})
