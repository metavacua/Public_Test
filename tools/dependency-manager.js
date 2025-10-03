const fs = require('fs');
const path = require('path');

const DEPENDENCIES_PATH = 'dependencies.json';
const INDEX_HTML_PATH = 'index.html';
const DEPENDENCY_PLACEHOLDER = '<!-- DEPENDENCIES -->';

function injectDependencies() {
  const dependencies = JSON.parse(fs.readFileSync(DEPENDENCIES_PATH, 'utf8'));
  let indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

  // Remove existing dependency scripts to ensure idempotency
  const dependencyUrls = Object.values(dependencies);
  dependencyUrls.forEach(url => {
    const scriptTagRegex = new RegExp(`<script src="${url}" crossorigin></script>\\n?`, 'g');
    indexHtml = indexHtml.replace(scriptTagRegex, '');
  });

  const scriptTags = dependencyUrls
    .map(url => `<script src="${url}" crossorigin></script>`)
    .join('\n  ');

  if (indexHtml.includes(DEPENDENCY_PLACEHOLDER)) {
    indexHtml = indexHtml.replace(DEPENDENCY_PLACEHOLDER, scriptTags);
  } else {
    // If the placeholder is not found, inject before the closing </head> tag
    indexHtml = indexHtml.replace('</head>', `  ${scriptTags}\n</head>`);
  }

  fs.writeFileSync(INDEX_HTML_PATH, indexHtml);
  console.log('Dependencies injected into index.html');
}

injectDependencies();