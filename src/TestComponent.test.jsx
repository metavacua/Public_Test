function TestComponentTest() {
  const { useEffect } = React;

  useEffect(() => {
    let success = false;
    let message = 'TestComponent did not render correctly';

    try {
      const component = document.querySelector('h1');
      if (component && component.textContent === "TestComponent Component") {
        success = true;
        message = 'TestComponent rendered correctly';
      }
    } catch (e) {
      message = `An error occurred during the test: ${e.message}`;
    }

    window.dispatchEvent(new CustomEvent('test-complete', { detail: { success, message } }));
  }, []);

  return React.createElement(TestComponent);
}

// --- Self-Rendering Logic ---
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(TestComponentTest));
}