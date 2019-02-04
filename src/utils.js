const isRegExp = item => typeof item === 'object' && item.constructor === RegExp
const isObject = item => item instanceof Object && item.constructor === Object
const getOnlyTargetFields = entries => entries.filter(({ value }) => typeof value === 'string')

module.exports = {
  isObject,
  isRegExp,
  getOnlyTargetFields,
}
