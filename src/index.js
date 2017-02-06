import findPackageJson from './findPackageJson'
import resolvePathAlias from './resolvePathAlias'

export default function () {
  return {
    visitor: {
      'ImportDeclaration|ExportAllDeclaration|ExportNamedDeclaration' (path, state) {
        if (!path.node.source) {
          return
        }

        const sourceFilePath = state.file.opts.filename
        const packageJson = findPackageJson(sourceFilePath)

        path.node.source.value = resolvePathAlias(
          packageJson.path,
          packageJson.data.name,
          sourceFilePath,
          path.node.source.value
        )
      }
    }
  }
}
