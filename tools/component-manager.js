const fs = require('fs');
const path = require('path');

const command = process.argv[2];
const componentName = process.argv[3];

const SRC_DIR = 'src';
const INDEX_HTML_PATH = 'index.html';

const componentTemplate = (name) => `
function ${name}() {
  const { useState, useEffect } = React;
  return (
    <div>
      <h1>${name} Component</h1>
    </div>
  );
}

// --- Self-Rendering Logic ---
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(${name}));
}
`;

function createComponent(name) {
  if (!name) {
    console.error('Error: Component name is required.');
    process.exit(1);
  }
  const componentPath = path.join(SRC_DIR, `${name}.jsx`);
  if (fs.existsSync(componentPath)) {
    console.error(`Error: Component ${name} already exists.`);
    process.exit(1);
  }
  fs.writeFileSync(componentPath, componentTemplate(name));
  console.log(`Component ${name} created at ${componentPath}`);
}

function setActiveComponent(name) {
  if (!name) {
    console.error('Error: Component name is required.');
    process.exit(1);
  }
  const componentPath = path.join(SRC_DIR, `${name}.jsx`);
  if (!fs.existsSync(componentPath)) {
    console.error(`Error: Component ${name} does not exist.`);
    process.exit(1);
  }

  let indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
  indexHtml = indexHtml.replace(/src=".*\.jsx"/, `src="${componentPath}"`);
  fs.writeFileSync(INDEX_HTML_PATH, indexHtml);
  console.log(`Active component set to ${name}`);
}

if (command === 'create-component') {
  createComponent(componentName);
} else if (command === 'set-active-component') {
  setActiveComponent(componentName);
} else {
  console.log('Usage:');
  console.log('  node tools/component-manager.js create-component <ComponentName>');
  console.log('  node tools/component-manager.js set-active-component <ComponentName>');
}