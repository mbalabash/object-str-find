const matchValue = require('./matchValue')
const { isRegExp, getOnlyTargetFields } = require('./utils')
const extractObjectEntries = require('./extractObjectEntries')
const appendNewItemToResults = require('./appendNewItemToResults')

const checkArgs = (object, value) => {
  if (!object || typeof object !== 'object') {
    throw new Error('The first argument should be an object!')
  }
  if (!Array.isArray(value) && (typeof value !== 'string' && !isRegExp(value))) {
    throw new Error('The second argument should be an array, string or regexp!')
  }
}

const objectStringFind = (object, value) => {
  checkArgs(object, value)
  const results = new Map()
  const entries = extractObjectEntries(object)
  const targetFields = getOnlyTargetFields(entries)

  targetFields.forEach((field) => {
    const { path, value: fieldValue } = field
    if (Array.isArray(value)) {
      value.forEach((searchValue) => {
        if (matchValue(fieldValue, searchValue)) {
          appendNewItemToResults(results, { path, found: [searchValue], value: fieldValue })
        }
      })
    } else if (matchValue(fieldValue, value)) {
      appendNewItemToResults(results, { path, found: [value], value: fieldValue })
    }
  })

  return Array.from(results.values())
}

module.exports = objectStringFind
