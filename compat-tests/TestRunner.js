import createTestCafe from 'testcafe';
import { AssertionFormatter }
  from 'ast-metadata-inferer/lib/helpers/AstNodeTypeTester';

export const BROWSER_NAME_MAPPINGS = {
  chrome: 'Chrome'
};

type RecordType = {
  protoChainId: string,
  protoChain: Array<string>
};

type browserNameType = 'chrome' | 'firefox';

export default function TestRunner(
  browserName: browserNameType,
  version: number,
  record: RecordType
) {
  let runner;
  let testcafe;

  // Test batch

  // Run the compat tests
  return createTestCafe('localhost', 1337, 1338)
    .then(_testcafe => {
      testcafe = _testcafe;
      runner = _testcafe.createRunner();
      return _testcafe.createBrowserConnection();
    })
    .then(remoteConnection => {
      return runner
        .src(path.join(__dirname, 'compat-tests', 'Test.js'))
        .browsers('saucelabs:Chrome@57.0')
        .run();
    })
    .then(() => testcafe.close());
}
