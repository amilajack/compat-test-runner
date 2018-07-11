import path from 'path';
import fs from 'fs';
import { Selector, ClientFunction } from 'testcafe';

fixture `Compat Test Runner`// declare the fixture
  .page `about:blank`;  // specify the start page

test('Compat tests', async t => {
  const testsPath = path.join(__dirname, '..', 'generated-compat-tests', 'foo.js');

  const records = await fs.promises
    .readFile(testsPath)
    .then(e => e.toString())
    .then(JSON.parse);

  const runComaptTests = ClientFunction(
    () => eval(
      `(function() {
        return [${records.join(',')}];
      })()`
    ),
    {
      dependencies: {
        records
      }
    }
  );

  const compatTestResults = await runComaptTests();

  const metaPath = path.join(__dirname, '..', 'meta.json');
  await fs.promises.writeFile(metaPath, compatTestResults);

  return compatTestResults;
});
