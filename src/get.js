const get = (object, path, value) => {
  if (!path) return undefined
  const pathArray = Array.isArray(path)
    ? path
    : path.split(/[,[\].]/g).filter(Boolean)
  return (
    pathArray.reduce((prevObj, key) => prevObj && prevObj[key], object) || value
  )
}

module.exports = get;