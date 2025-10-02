# React Component Dashboard

This project is a development harness and dashboard for a collection of standalone React components. Its primary purpose is to provide a consistent, runnable environment for testing and demonstrating various tools designed for browser introspection, security analysis, and agent-based interactions.

The key architectural feature of this project is that it does **not** use a traditional Node.js/npm build pipeline (like Webpack or Vite). Instead, all dependencies, including React itself, are loaded directly in the browser from a Content Delivery Network (CDN). This makes the components highly portable and easy to run in isolated environments.

## Features

The dashboard provides access to the following components:

-   **CLI:** A command-line interface for advanced environment probing.
-   **Vulnerability Test Harness:** A tool for safely executing and monitoring potentially dangerous JavaScript code in a sandboxed iframe.
-   **Canvas Agent:** An autonomous agent capable of generating and executing plans to achieve goals within the browser environment.
-   **JS Introspector:** A static analysis tool that uses an AST parser to identify functions and variables in user-provided JavaScript code.
-   **Comprehensive Prober:** A deep-dive environment prober that tests a wide range of browser APIs, from storage and permissions to WebGL and WebRTC.
-   **CDN Canary:** A testbed for analyzing the compatibility and security policies related to loading external JavaScript libraries from CDNs.

## Getting Started

To run the component dashboard locally, you need to have Node.js and npm installed.

### 1. Install Dependencies

First, install the development dependencies defined in `package.json`. These include tools for linting, formatting, and running the local development server.

```bash
npm install
```

### 2. Run the Development Server

This command will start a local web server and open the `index.html` dashboard in your browser.

```bash
npm start
```

Once running, you can select any of the available components from the dropdown menu to load and view it.

## Development

This project uses ESLint for code linting and Prettier for code formatting.

-   To run the linter: `npm run lint`
-   To automatically fix linting issues: `npm run lint:fix`
-   To format all code: `npm run format`
-   To run the verification tests: `npm test`

---

## Working with Jules (AI Software Engineer)

To ensure a smooth and efficient development process, we have established a clear delineation of responsibilities.

### User Responsibilities

The user is responsible for tasks that require high-level direction or access to sensitive information.

-   **Providing Secrets and API Keys:** For security reasons, the user must manage all secrets and API keys (e.g., for Firebase or Gemini) through the GitHub repository's secrets management system.
-   **Final Repository Configuration:** The user is responsible for final repository settings, such as enabling GitHub Actions or merging pull requests.
-   **Setting High-Level Goals:** The user provides the initial goals and direction for the project.

### Jules's Responsibilities

Jules, the AI assistant, is responsible for the hands-on technical implementation and maintenance of the project.

-   **Code Implementation:** Writing, debugging, and refactoring all project code.
-   **Documentation:** Creating and maintaining `README.md`, `SETUP.md`, `AGENTS.md`, and other necessary documentation.
-   **Environment and Workflow Setup:** Creating and managing all configuration files, including `package.json`, `.eslintrc.js`, and GitHub Actions workflows.
-   **Testing and Verification:** Writing and running tests (including Playwright scripts) to ensure the code is correct and functional before submission.