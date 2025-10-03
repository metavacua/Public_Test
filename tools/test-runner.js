const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const SRC_DIR = 'src';
const TESTING_DIR = 'testing';
const TEMP_HTML_PATH = path.join(TESTING_DIR, 'temp-test.html');

const testHtmlTemplate = (testFilePath) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test Runner</title>
  <!-- DEPENDENCIES -->
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" src="${testFilePath}"></script>
</body>
</html>
`;

async function runTests() {
  const testFiles = fs.readdirSync(SRC_DIR).filter(file => file.endsWith('.test.jsx'));

  if (testFiles.length === 0) {
    console.log('No test files found.');
    return;
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const testFile of testFiles) {
    const testFilePath = path.join(SRC_DIR, testFile);
    const htmlContent = testHtmlTemplate(testFilePath);
    fs.writeFileSync(TEMP_HTML_PATH, htmlContent);

    // Inject dependencies
    const dependencyManager = require('./dependency-manager.js');

    console.log(`Running test: ${testFile}`);

    await page.goto(`file://${path.resolve(TEMP_HTML_PATH)}`);

    const testResult = await page.evaluate(() => {
      return new Promise((resolve) => {
        window.addEventListener('test-complete', (e) => {
          resolve(e.detail);
        });
      });
    });

    if (testResult.success) {
      console.log(`  ✅ ${testResult.message}`);
    } else {
      console.error(`  ❌ ${testResult.message}`);
    }
  }

  await browser.close();
  fs.unlinkSync(TEMP_HTML_PATH);
}

runTests();