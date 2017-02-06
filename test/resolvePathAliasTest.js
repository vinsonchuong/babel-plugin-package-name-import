import test from 'ava'
import * as path from 'path'
import resolvePathAlias from 'babel-plugin-package-name-import/src/resolvePathAlias'

test('replaces an aliased path with a relative path', (t) => {
  const fixturePath = path.resolve('test/fixtures/project')

  t.is(
    resolvePathAlias(
      fixturePath,
      'project',
      path.join(fixturePath, 'index.js'),
      'other-package'
    ),
    'other-package'
  )

  t.is(
    resolvePathAlias(
      fixturePath,
      'project',
      path.join(fixturePath, 'index.js'),
      'project'
    ),
    '.'
  )

  t.is(
    resolvePathAlias(
      fixturePath,
      'project',
      path.join(fixturePath, 'lib/importer.js'),
      'project'
    ),
    '..'
  )

  t.is(
    resolvePathAlias(
      fixturePath,
      'project',
      path.join(fixturePath, 'index.js'),
      'project/lib/importer'
    ),
    './lib/importer'
  )

  t.is(
    resolvePathAlias(
      fixturePath,
      'project',
      path.join(fixturePath, 'lib/importer.js'),
      'project/lib/importer'
    ),
    './importer'
  )
})
