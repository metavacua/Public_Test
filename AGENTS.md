# Agent Instructions for the Introspection Tool Repository

This document provides critical instructions for any agent working within this repository. Adhering to these guidelines is essential for successful development and testing.

## Core Environmental Constraints

This project operates in a **no-build, CDN-based environment**. This is the most important constraint to understand. All dependencies, including React and Babel, are loaded globally from a CDN at runtime. This has several key implications for how you must write code:

### 1. No `import` or `export` Statements

You **must not** use JavaScript's `import` or `export` statements. The environment does not have a build step to resolve modules. All necessary libraries are loaded via `<script>` tags in `index.html` and are available as global variables. Using `import` will cause the in-browser Babel transpiler to fail, which will prevent the application from rendering.

### 2. Use the Global `React` Object

React is loaded from a CDN and is available as a global variable at `window.React`. You **must not** try to `import React from 'react'`.

When using React hooks, you must call them as properties of the global `React` object. For example:

```javascript
// Correct:
const [myState, setMyState] = React.useState('');
const myRef = React.useRef(null);

// Incorrect:
const [myState, setMyState] = useState(''); // This will fail.
```

A good practice is to destructure the necessary hooks from the global `React` object at the top of your component function:

```javascript
function MyComponent() {
  const { useState, useEffect, useCallback } = React;
  // ... now you can use useState, useEffect, etc. directly
}
```

### 3. Self-Rendering Components

All React components in this repository are designed to be self-rendering. This means that the component file itself must contain the logic to mount it to the DOM. The `ReactDOM.createRoot().render()` call should be at the very end of the file, after all component functions have been defined.

```javascript
// --- Self-Rendering Logic ---
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(JulesIntrospector));
}
```

## Development and Testing Workflow

1.  **Start the Server:** To run the application, you must serve the files with a local web server. Python's built-in server is a good option:
    ```bash
    python -m http.server
    ```

2.  **Verify Changes:** After making any changes, you must verify them by running the Playwright script:
    ```bash
    python jules-scratch/verification/verify_introspection_tool.py
    ```

By following these instructions, you can avoid the common pitfalls of this unique environment and ensure that your contributions are successful.

## Development Tools

To streamline the development process, a suite of tools has been created in the `tools` directory. You should use these tools to manage components and dependencies.

### Component Manager

Use the `component-manager.js` script to create and manage components.

*   **To create a new component:**
    ```bash
    node tools/component-manager.js create-component <ComponentName>
    ```
    This will create a new, self-rendering React component in the `src` directory with the correct boilerplate.

*   **To set the active component for testing:**
    ```bash
    node tools/component-manager.js set-active-component <ComponentName>
    ```
    This will automatically update `index.html` to load the specified component.

### Dependency Manager

The `dependency-manager.js` script manages the project's CDN dependencies.

*   **To inject/update dependencies:**
    ```bash
    node tools/dependency-manager.js
    ```
    This script reads the `dependencies.json` file and injects the required `<script>` tags into `index.html`. If you need to add or update a dependency, you should modify the `dependencies.json` file and then run this script.