import test from 'ava'
import * as path from 'path'
import findPackageJson from 'babel-plugin-package-name-import/src/findPackageJson'

test('locates the nearest package.json', (t) => {
  const fixturePath = path.resolve('test/fixtures/project')
  const packageJsonPath = path.join(fixturePath, 'package.json')
  const packageJsonData = require(packageJsonPath)
  const packageJson = {
    path: fixturePath,
    data: packageJsonData
  }

  t.deepEqual(findPackageJson(fixturePath), packageJson)
  t.deepEqual(findPackageJson(path.join(fixturePath, 'lib')), packageJson)
})
