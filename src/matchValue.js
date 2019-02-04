const { isRegExp } = require('./utils')

const matchValue = (objectValue, searchValue) => {
  if (typeof searchValue === 'string') {
    return objectValue.includes(searchValue)
  }
  if (isRegExp(searchValue)) {
    return searchValue.test(objectValue)
  }
  return false
}

module.exports = matchValue
