function JulesIntrospectorTest() {
  const { useEffect } = React;

  useEffect(() => {
    let success = false;
    let message = 'JulesIntrospector did not render correctly';

    try {
      const component = document.querySelector('h1');
      if (component && component.textContent === "Jules' Comprehensive Introspector") {
        success = true;
        message = 'JulesIntrospector rendered correctly';
      }
    } catch (e) {
      message = `An error occurred during the test: ${e.message}`;
    }

    window.parent.postMessage({
      type: 'test-complete',
      detail: { success, message }
    }, '*');
  }, []);

  return React.createElement(JulesIntrospector);
}

// --- Self-Rendering Logic ---
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(JulesIntrospectorTest));
}