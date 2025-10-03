function MinimalTest() {
  const { useEffect } = React;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('test-complete', { detail: { success: true, message: 'Minimal test passed' } }));
  }, []);

  return React.createElement('div', null, 'Running minimal test...');
}

// --- Self-Rendering Logic ---
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(MinimalTest));
}