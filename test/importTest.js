import test from 'ava'
import dedent from 'dedent'
import compile from 'babel-plugin-package-name-import/test/helpers/compile'
import packageNameImport from 'babel-plugin-package-name-import'

test('rewrites import paths', async (t) => {
  t.is(
    await compile(
      'test/fixtures/project/lib/importer.js',
      {plugins: [packageNameImport]}
    ),
    "import main from '..';"
  )

  t.is(
    await compile(
      'test/fixtures/project/index.js',
      {plugins: [packageNameImport]}
    ),
    dedent`
      export * from './lib/importer';
      export { default as importer } from './lib/importer';
    `
  )

  t.truthy(
    await compile(
      'test/fixtures/project/lib/otherImportExports.js',
      {plugins: [packageNameImport]}
    )
  )
})
