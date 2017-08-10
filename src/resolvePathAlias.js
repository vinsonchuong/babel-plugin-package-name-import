import * as path from 'path'

export default function(rootPath, rootName, importerPath, importedPath) {
  if (importedPath.split(path.sep)[0] !== rootName) {
    return importedPath
  }

  const relativePath = path.relative(
    path.dirname(importerPath),
    importedPath.replace(rootName, rootPath)
  )

  if (relativePath === '') {
    return '.'
  }

  if (relativePath === '..') {
    return '..'
  }

  return `.${path.sep}${relativePath}`
}
