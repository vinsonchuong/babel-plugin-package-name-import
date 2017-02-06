import * as path from 'path'

export default function findPackageJson (sourceFilePath) {
  try {
    const packageJsonPath = path.resolve(sourceFilePath, 'package.json')
    return {
      path: path.dirname(packageJsonPath),
      data: require(packageJsonPath)
    }
  } catch (error) {
    return findPackageJson(path.dirname(sourceFilePath))
  }
}

