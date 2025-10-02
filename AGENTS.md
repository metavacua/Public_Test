# Agent Instructions for "react-component-dashboard"

This document outlines the specific rules and development patterns that must be followed when working on this project. This repository uses a non-standard, browser-only execution environment, so adherence to these rules is critical for success.

## 1. Environment Architecture

This project does **not** use a Node.js build system (like Webpack or Vite). All components are standalone React applications rendered by a single `index.html` file that loads dependencies directly from a CDN.

-   **Dependencies are Global:** React, ReactDOM, and Babel are loaded from a CDN and exist as global variables (`window.React`, `window.ReactDOM`). Do not add `import` statements for them in component files.
-   **Local Server is Required:** All testing and verification must be done by running a local web server (`npm start`). Direct `file://` access will not work due to browser security policies (CORS).

## 2. React Component Rules

All React components in this project **must** follow this specific structure to be compatible with the dashboard loader.

### Rule 2.1: No Module Imports/Exports

-   **DO NOT** use `import React from 'react'`. React is already in the global scope.
-   **DO NOT** use `export default App`. Components should not be ES modules.

### Rule 2.2: Qualify React Hooks

-   All React hooks (`useState`, `useEffect`, `useRef`, `useCallback`, etc.) **must** be explicitly called as properties of the global `React` object.
    -   **Correct:** `const [myState, setMyState] = React.useState('');`
    -   **Incorrect:** `const [myState, setMyState] = useState('');`

### Rule 2.3: Global Component Assignment

-   Each main component function **must** be assigned to a unique property on the `window` object. This is how the central dashboard finds and renders it.
-   The variable name should be descriptive (e.g., `window.MyAwesomeComponentApp`).
    -   **Correct:** `window.MyAwesomeComponentApp = function App() { ... };`
    -   **Incorrect:** `function App() { ... };` or `const App = () => { ... };`

### Rule 2.4: No Self-Rendering

-   Components **must not** render themselves. The `index.html` dashboard is responsible for all rendering logic (`ReactDOM.createRoot(...).render(...)`).
-   **DO NOT** include `ReactDOM.createRoot` or `root.render` calls at the end of a component file.

## 3. Verification and Testing

-   Any change to a component's UI **must** be verified using the comprehensive Playwright script located at `jules-scratch/verification/verify_all.py`.
-   If you add a new component, you **must** update this verification script to include a test for it. The test should select the new component from the dashboard dropdown and wait for a unique, stable selector to confirm it has rendered correctly.
-   All verification tests **must** pass before submitting code.