const test = require('ava')
const extractObjectEntries = require('../src/extractObjectEntries')

test('should correctly extract entries from simple object', (t) => {
  const obj1 = { name: 'sdklsd', number: 3232143 }
  const obj2 = { qwe: 'asd', zxc: 123, test: undefined }
  const obj3 = { prop1: 1, prop2: 2, prop3: 3 }

  t.deepEqual(extractObjectEntries(obj1), [
    { path: 'name', value: 'sdklsd' },
    { path: 'number', value: 3232143 },
  ])
  t.deepEqual(extractObjectEntries(obj2), [
    { path: 'qwe', value: 'asd' },
    { path: 'zxc', value: 123 },
    { path: 'test', value: undefined },
  ])
  t.deepEqual(extractObjectEntries(obj3), [
    { path: 'prop1', value: 1 },
    { path: 'prop2', value: 2 },
    { path: 'prop3', value: 3 },
  ])
})

test('should correctly extract entries from object with inner objects', (t) => {
  const object = {
    name: 'asd',
    number: 1232,
    data: {
      prop1: 1,
      prop2: 2,
      prop3: {
        caption: 'ijoikjlk',
      },
    },
  }
  t.deepEqual(extractObjectEntries(object), [
    { path: 'name', value: 'asd' },
    { path: 'number', value: 1232 },
    { path: 'data.prop1', value: 1 },
    { path: 'data.prop2', value: 2 },
    { path: 'data.prop3.caption', value: 'ijoikjlk' },
  ])
})
