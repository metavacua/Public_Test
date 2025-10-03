function TestComponent() {
  const { useState, useEffect } = React;
  return (
    <div>
      <h1>TestComponent Component</h1>
    </div>
  );
}

// --- Self-Rendering Logic ---
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(TestComponent));
}