# Project Setup and Configuration

## Overview

This project consists of a collection of standalone React components designed to run in a specific, sandboxed "Canvas" environment. They are not part of a traditional Node.js/npm project. Instead of a build step, all dependencies, including React itself, are expected to be loaded at runtime, typically from a Content Delivery Network (CDN).

The components are highly specialized tools for environment introspection, security testing, and advanced agent-based interactions.

## Core Requirements

### 1. Execution Environment

- **Host HTML File:** A parent `index.html` file is required to host the components.
- **React & ReactDOM:** These libraries must be loaded globally, usually via `<script>` tags from a CDN, before any component scripts are executed.
- **Root Element:** The host HTML file must contain a root DOM element (e.g., `<div id="root"></div>`) where the React component will be mounted.

### 2. Dependencies

The components rely on several external libraries being available in the global scope. These should be included in the host HTML file.

- **React:** `https://unpkg.com/react@18/umd/react.development.js`
- **ReactDOM:** `https://unpkg.com/react-dom@18/umd/react-dom.development.js`
- **Babel (for JSX):** `https://unpkg.com/@babel/standalone/babel.min.js` (Required to transpile JSX in the browser)

**Component-Specific Dependencies:**

- **`GeminiAppJavascriptIntrospector.jsx`**:
  - `acorn`: `https://unpkg.com/acorn/dist/acorn.js`
  - `estraverse`: `https://unpkg.com/estraverse/estraverse.js`

- **`GeminiCDNCanary.txt` / `GeminiAppProbeReactApp.txt`**: These components dynamically load various other libraries (e.g., Firebase, JSON5, Peggy.js) as part of their testing function. The host environment must allow script injection and cross-origin requests (or use a proxy like `api.allorigins.win`).

### 3. Configuration (Global Variables)

Several components expect global JavaScript variables to be defined in the `window` scope by the host environment. These are used for backend integration and authentication.

- **`__firebase_config`**: (String or Object) A Firebase configuration object.
- **`__app_id`**: (String) A unique identifier for the application instance.
- **`__initial_auth_token`**: (String) A JWT token for initial Firebase authentication.
- **`GEMINI_API_KEY`**: (String) An API key for the Google Gemini API. This is found as a placeholder in `GeminiAppCanvasAgent.txt` and `GeminiAppProbeReactApp.txt`.

### 4. Running a Component (Example)

To run a component, you must:

1.  Rename the component file from `.txt` or `.jsx` to a consistent `.jsx` extension.
2.  In the host HTML file, add a `<script type="text/babel">` tag that:
    -   Imports the component.
    -   Uses `ReactDOM.createRoot()` and `root.render()` to mount the component into the designated root element.

This setup provides the necessary framework to run and test each of the provided standalone tools.