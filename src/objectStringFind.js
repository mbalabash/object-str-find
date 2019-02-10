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

/**
 * Find substring or match regexp in the object and his inner objects.
 * @param {Object} object Target object
 * @param {(String|RegExp|(String|RegExp)[])}
 * String or regexp or array of string and/or regexp values for searching in object properties.
 * @returns {Array}
 */
const objectStringFind = (object, value) => {
  checkArgs(object, value)
  const results = new Map()
  const entries = extractObjectEntries(object)
  const targetFields = getOnlyTargetFields(entries)
  const predictors = Array.isArray(value) ? value : [value]

  targetFields.forEach((field) => {
    const { path, value: fieldValue } = field
    predictors.forEach((predictor) => {
      if (matchValue(fieldValue, predictor)) {
        appendNewItemToResults(results, { path, found: [predictor], value: fieldValue })
      }
    })
  })

  return Array.from(results.values())
}

module.exports = objectStringFind
