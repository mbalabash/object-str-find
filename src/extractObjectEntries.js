const { isObject } = require('./utils')

/**
 * Recursevly extract all properties for target object and his inner objects
 * @param {Object} object Target object
 * @param {String} parentPropName Parent property name of parent property
 * @returns {Array}
 */
const extractObjectEntries = (object, parentPropName = '') => {
  let entries = []

  Object.entries(object).forEach((item) => {
    const [prop, value] = item
    const path = parentPropName ? `${parentPropName}.${prop}` : prop

    if (isObject(value)) {
      entries = entries.concat(extractObjectEntries(value, path))
    } else {
      entries.push({ path, value })
    }
  })

  return entries
}

module.exports = extractObjectEntries
