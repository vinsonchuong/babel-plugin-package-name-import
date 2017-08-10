import * as path from 'path'
import { findNearestPackageJsonSync } from 'find-nearest-package-json'
import resolvePathAlias from './resolvePathAlias'

export default function() {
  return {
    visitor: {
      'ImportDeclaration|ExportAllDeclaration|ExportNamedDeclaration'(
        astPath,
        astState
      ) {
        if (!astPath.node.source) {
          return
        }

        const sourceFilePath = astState.file.opts.filename

        try {
          const packageJson = findNearestPackageJsonSync(sourceFilePath)

          astPath.node.source.value = resolvePathAlias(
            path.dirname(packageJson.path),
            packageJson.data.name,
            sourceFilePath,
            astPath.node.source.value
          )
        } catch (error) {}
      }
    }
  }
}
