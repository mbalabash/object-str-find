const appendNewItemToResults = (results, item) => {
  const { path } = item
  if (results.has(path)) {
    const current = results.get(path)
    current.search = current.search.concat(item.search)
    results.set(path, current)
  } else {
    results.set(path, item)
  }
}

module.exports = appendNewItemToResults
