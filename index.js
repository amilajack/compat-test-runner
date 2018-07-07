const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const createTestCafe = require('testcafe');
const astMetadata = require('ast-metadata-inferer');
const { AssertionFormatter } =
  require('ast-metadata-inferer/lib/helpers/AstNodeTypeTester');

dotenv.config();

const testsPath = path.join(__dirname, 'generated-compat-tests', 'foo.js');

async function main() {
  // Generate compat tests for all the records
  const comaptRecords = astMetadata.slice(0, 10);
  const compatTests =
    comaptRecords.map(record => AssertionFormatter(record).apiIsSupported);

  await fs.promises.writeFile(testsPath, JSON.stringify(compatTests));

  let runner;
  let testcafe;

  // Run the compat tests
  return createTestCafe('localhost', 1337, 1338)
    .then(_testcafe => {
      testcafe = _testcafe;
      runner = _testcafe.createRunner();
      return _testcafe.createBrowserConnection();
    })
    .then(remoteConnection => {
      return runner
        .src(path.join(__dirname, 'compat-tests', 'TestRunner.js'))
        .browsers('saucelabs:Chrome@beta:Windows 10')
        .run();
    })
    .then(() => testcafe.close());
}

main();
