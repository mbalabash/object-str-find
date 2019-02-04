const { isObject } = require('./utils')

const extractObjectEntries = (object, parrentPropName = '') => {
  let entries = []

  Object.entries(object).forEach((item) => {
    const [prop, value] = item
    const path = parrentPropName ? `${parrentPropName}.${prop}` : prop

    if (isObject(value)) {
      entries = entries.concat(extractObjectEntries(value, path))
    } else {
      entries.push({ path, value })
    }
  })

  return entries
}

module.exports = extractObjectEntries
