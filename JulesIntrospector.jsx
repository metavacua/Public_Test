// --- Helper Components ---
const StatusIcon = ({ status }) => {
  const iconMap = {
    pass: <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
    fail: <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
    warn: <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>,
    info: <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
    loading: <svg className="animate-spin h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
  };
  return iconMap[status] || null;
};

const ProfileCard = ({ title, status, children, learnMoreUrl }) => {
  const statusClasses = { pass: 'border-green-500/50 bg-green-500/10', fail: 'border-red-500/50 bg-red-500/10', warn: 'border-yellow-500/50 bg-yellow-500/10', info: 'border-blue-500/50 bg-blue-500/10', loading: 'border-gray-500/50 bg-gray-500/10 animate-pulse' };
  return <div className={`border rounded-lg p-4 flex flex-col transition-all duration-300 ${statusClasses[status]}`}><div className="flex items-center mb-2"><StatusIcon status={status} /><h3 className="text-lg font-semibold ml-3 text-gray-800 dark:text-gray-200">{title}</h3></div><div className="text-gray-600 dark:text-gray-400 text-sm flex-grow">{children}</div>{learnMoreUrl && <a href={learnMoreUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 text-xs mt-3 self-start">Learn more &rarr;</a>}</div>;
};

const FeasibleAlternativesReport = () => (
    <div className="mt-6 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50">
        <h3 className="text-xl font-bold mb-4 text-center">Feasible Development Alternatives Report</h3>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">This report outlines what is and isn't possible in the current browser environment.</p>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 flex items-center"><StatusIcon status="pass"/> <span className="ml-2">Category 1: Feasible</span></h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <li><b>Single-Page Applications (SPAs)</b></li>
                    <li><b>Offline-Capable Apps & PWAs</b></li>
                    <li><b>Client-Side Tools (WASM)</b></li>
                    <li><b>2D/3D Graphics & Visualizations (WebGL)</b></li>
                    <li><b>Local Single-Threaded AI/ML</b></li>
                </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 flex items-center"><StatusIcon status="fail"/> <span className="ml-2">Category 2: Infeasible</span></h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 my-2">The critical limitation is that this environment is <b>not cross-origin isolated</b>, which disables `SharedArrayBuffer`.</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><b>In-Browser Node.js (npm)</b></li>
                    <li><b>In-Browser Virtual Machines</b></li>
                    <li><b>Multi-Threaded AI/ML</b></li>
                </ul>
            </div>
        </div>
    </div>
);

// --- OS Profiler Component ---
function OSProfiler() {
  const [results, setResults] = React.useState({ crossOriginIsolated: { status: 'loading' }, sharedArrayBuffer: { status: 'loading' }, webAssembly: { status: 'loading' }, isSecureContext: { status: 'loading' }, webGL: { status: 'loading' }, webSocket: { status: 'loading' }, indexedDB: { status: 'loading' }, serviceWorker: { status: 'loading' }, userAgent: { status: 'info', message: navigator.userAgent } });
  const [overallVerdict, setOverallVerdict] = React.useState({ status: 'loading', message: 'Awaiting critical checks...' });
  const [showAlternatives, setShowAlternatives] = React.useState(false);

  React.useEffect(() => {
    const newResults = {};
    const isIsolated = window.crossOriginIsolated === true;
    newResults.crossOriginIsolated = isIsolated ? { status: 'pass', message: 'Environment is cross-origin isolated.' } : { status: 'fail', message: 'Environment is NOT cross-origin isolated.' };
    const hasSharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined';
    newResults.sharedArrayBuffer = hasSharedArrayBuffer ? { status: 'pass', message: 'SharedArrayBuffer is available.' } : { status: 'fail', message: 'SharedArrayBuffer is not available.' };
    setOverallVerdict(isIsolated && hasSharedArrayBuffer ? { status: 'pass', message: 'This environment can run a VM or WebContainer.' } : { status: 'fail', message: 'This environment cannot run a VM or WebContainer.' });
    newResults.webAssembly = (typeof WebAssembly === 'object') ? { status: 'pass', message: 'WebAssembly is supported.' } : { status: 'fail', message: 'WebAssembly is not supported.' };
    newResults.isSecureContext = window.isSecureContext ? { status: 'pass', message: 'Page is in a secure context (HTTPS).' } : { status: 'warn', message: 'Page is not in a secure context.' };
    try { const canvas = document.createElement('canvas'); const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl'); newResults.webGL = gl ? { status: 'pass', message: 'WebGL is supported.' } : { status: 'warn', message: 'WebGL is not supported.' }; } catch (e) { newResults.webGL = { status: 'fail', message: 'Could not check for WebGL support.' }; }
    try { const ws = new WebSocket('wss://echo.websocket.org/'); ws.onopen = () => { setResults(prev => ({ ...prev, webSocket: { status: 'pass', message: 'WebSocket connections allowed.' } })); ws.close(); }; ws.onerror = () => setResults(prev => ({ ...prev, webSocket: { status: 'warn', message: 'WebSocket connections may be blocked.' } })); } catch (e) { newResults.webSocket = { status: 'fail', message: 'Failed to init WebSocket.' }; }
    newResults.indexedDB = ('indexedDB' in window) ? { status: 'pass', message: 'IndexedDB is available.' } : { status: 'warn', message: 'IndexedDB is not available.' };
    newResults.serviceWorker = ('serviceWorker' in navigator) ? { status: 'pass', message: 'Service Workers are supported.' } : { status: 'warn', message: 'Service Workers are not supported.' };
    setResults(prev => ({ ...prev, ...newResults }));
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center"><h1 className="text-4xl font-bold text-gray-800 dark:text-white">OS Environment Profile</h1></header>
        <section className="mb-8">
             <div className={`p-6 rounded-xl shadow-lg ${overallVerdict.status === 'pass' ? 'bg-green-500' : 'bg-red-500'}`}><div className="flex items-center"><div className="text-white text-3xl mr-4">{overallVerdict.status === 'pass' ? '✅' : '❌'}</div><div><h2 className="text-2xl font-bold text-white">Overall Assessment: {overallVerdict.status === 'pass' ? 'Go' : 'No-Go'}</h2><p className="text-white/90">{overallVerdict.message}</p></div></div></div>
        </section>
        {overallVerdict.status !== 'loading' && <div className="mb-8 p-4 bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 text-blue-800 dark:text-blue-200 rounded-r-lg"><div className="flex justify-between items-center"><div><p className="font-semibold">What does this result mean?</p></div><button onClick={() => setShowAlternatives(!showAlternatives)} className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 font-semibold py-1 px-3 rounded-md shadow hover:bg-gray-50 dark:hover:bg-gray-600 transition">{showAlternatives ? 'Hide Report' : 'Show Report'}</button></div></div>}
        {showAlternatives && <FeasibleAlternativesReport />}
        <main className="space-y-6">
            <div><h2 className="text-2xl font-semibold border-b pb-2 mb-4">Critical VM Requirements</h2><div className="grid md:grid-cols-2 gap-4"><ProfileCard title="Cross-Origin Isolation" status={results.crossOriginIsolated.status} learnMoreUrl="https://web.dev/coop-coep/"><p>{results.crossOriginIsolated.message}</p>{results.crossOriginIsolated.status === 'fail' && (<div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-xs"><p className="font-semibold mb-1">To fix this, serve your page with these HTTP headers:</p><code className="block whitespace-pre-wrap font-mono text-blue-500 dark:text-blue-400">Cross-Origin-Opener-Policy: same-origin<br/>Cross-Origin-Embedder-Policy: require-corp</code></div>)}</ProfileCard><ProfileCard title="SharedArrayBuffer" status={results.sharedArrayBuffer.status} learnMoreUrl="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer"><p>{results.sharedArrayBuffer.message}</p></ProfileCard></div></div>
            <div><h2 className="text-2xl font-semibold border-b pb-2 mb-4">Core Browser Capabilities</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"><ProfileCard title="Secure Context (HTTPS)" status={results.isSecureContext.status}><p>{results.isSecureContext.message}</p></ProfileCard><ProfileCard title="WebAssembly" status={results.webAssembly.status}><p>{results.webAssembly.message}</p></ProfileCard><ProfileCard title="WebGL (Graphics)" status={results.webGL.status}><p>{results.webGL.message}</p></ProfileCard><ProfileCard title="WebSockets" status={results.webSocket.status}><p>{results.webSocket.message}</p></ProfileCard><ProfileCard title="IndexedDB (Storage)" status={results.indexedDB.status}><p>{results.indexedDB.message}</p></ProfileCard><ProfileCard title="Service Workers" status={results.serviceWorker.status}><p>{results.serviceWorker.message}</p></ProfileCard></div></div>
            <div><h2 className="text-2xl font-semibold border-b pb-2 mb-4">Environment Information</h2><div className="grid grid-cols-1"><ProfileCard title="User Agent" status={results.userAgent.status}><p className="font-mono text-xs break-words">{results.userAgent.message}</p></ProfileCard></div></div>
        </main>
      </div>
    </div>
  );
}

// --- CLI Component from GeminiAppCanvasCLI ---
function CLI({ appRootRef }) {
  const [history, setHistory] = React.useState([{ command: 'welcome', output: 'CLI initialized. Type `help` for a list of commands.' }]);
  const [command, setCommand] = React.useState('');
  const terminalRef = React.useRef(null);

  const runTest = async (title, testFn) => { try { const data = await testFn(); const icon = data.toString().includes('denied') || data.toString().includes('blocked') ? 'ℹ️' : '✅'; return `${icon} ${title.padEnd(25, ' ')} ${data}`; } catch (error) { return `❌ ${title.padEnd(25, ' ')} Failed. Reason: ${error.message}`; } };
  const runComprehensiveProbe = async () => { let output = "🔬 Running Comprehensive Environment Probe...\n"; const categories = { "Storage & Quotas": [ runTest('Cookies', () => Promise.resolve(navigator.cookieEnabled ? 'Enabled' : 'Disabled')), runTest('LocalStorage', () => { localStorage.setItem('probe', 'test'); localStorage.removeItem('probe'); return Promise.resolve('Writable'); }), runTest('SessionStorage', () => { sessionStorage.setItem('probe', 'test'); sessionStorage.removeItem('probe'); return Promise.resolve('Writable'); }), runTest('IndexedDB', () => new Promise((resolve, reject) => { const request = indexedDB.open('ProbeDB'); request.onerror = () => reject(new Error('Open failed')); request.onsuccess = () => { request.result.close(); indexedDB.deleteDatabase('ProbeDB'); resolve('Accessible'); }; })), runTest('Storage Quota', async () => { if (!navigator.storage || !navigator.storage.estimate) throw new Error('StorageManager API not supported.'); const quota = await navigator.storage.estimate(); return `${(quota.usage / 1024 / 1024).toFixed(2)}MB used of ${(quota.quota / 1024 / 1024).toFixed(2)}MB quota`; }), ], "Modern & Media APIs": [ runTest('Geolocation', () => new Promise((resolve, reject) => { if (!navigator.geolocation) reject(new Error('API not available.')); const timeout = setTimeout(() => reject(new Error('Permission denied or timed out.')), 5000); navigator.geolocation.getCurrentPosition( (pos) => { clearTimeout(timeout); resolve(`Lat/Lon received.`); }, (err) => { clearTimeout(timeout); reject(new Error(`Error: ${err.message}`)); } ); })), runTest('Web Audio API', () => { const context = new (window.AudioContext || window.webkitAudioContext)(); if (!context) throw new Error('Not supported.'); context.close(); return Promise.resolve('AudioContext created.'); }), runTest('Payment Request API', () => Promise.resolve(window.PaymentRequest ? 'Available' : 'Not supported.')), runTest('Web Share API', () => Promise.resolve(navigator.share ? 'Available' : 'Not supported.')), ], "Networking & Permissions": [ runTest('Fetch (Egress)', () => fetch('https://httpbin.org/get').then(res => `Request OK (${res.status})`)), runTest('WebSockets', () => new Promise((resolve, reject) => { const ws = new WebSocket('wss://socketsbay.com/wss/v2/1/demo/'); const timeout = setTimeout(() => { ws.close(); reject(new Error('Connection timed out')); }, 2000); ws.onopen = () => { clearTimeout(timeout); ws.close(); resolve('Connection allowed'); }; ws.onerror = () => { clearTimeout(timeout); reject(new Error('Connection failed or blocked')); }; })), runTest('Permissions(Clipboard)', () => navigator.permissions.query({ name: 'clipboard-write' }).then(p => `Clipboard-write state: ${p.state}`)), ], }; for (const category in categories) { output += `\n--- ${category} ---\n`; const results = await Promise.all(categories[category]); output += results.join('\n'); } return output.trim(); };
  const formatReactValue = (value, depth = 0, maxDepth = 3) => { if (depth > maxDepth) return '[...]'; if (value === null) return 'null'; if (typeof value === 'string') return `"${value}"`; if (typeof value !== 'object') return value.toString(); if (Array.isArray(value)) return `[Array(${value.length})]`; if (typeof value === 'function') return `[Function: ${value.name || 'anonymous'}]`; if (value.$$typeof === Symbol.for('react.element')) return `<${value.type.name || 'Component'} />`; const constructorName = value.constructor ? value.constructor.name : 'Object'; if (constructorName !== 'Object') return `[Object: ${constructorName}]`; return JSON.stringify(value); };
  const inspectFiberNode = (fiber, depth = 0, maxDepth = 10) => { if (!fiber || depth > maxDepth) return ''; const indent = '  '.repeat(depth); let output = `${indent}└── <${fiber.type ? (fiber.type.name || 'Component') : 'Unknown'}>\n`; if (fiber.child) output += inspectFiberNode(fiber.child, depth + 1, maxDepth); if (fiber.sibling) output += inspectFiberNode(fiber.sibling, depth, maxDepth); return output; };
  const advancedFiberTree = (rootElement) => { if (!rootElement) return "Error: App root not found."; const fiberKey = Object.keys(rootElement).find(key => key.startsWith('__reactFiber$')); if (!fiberKey) return "Error: Could not find React Fiber key."; const rootFiber = rootElement[fiberKey]; if (!rootFiber) return "Error: Could not access root Fiber node."; return inspectFiberNode(rootFiber).trim(); };
  const getGlobals = (filter) => Object.keys(window).filter(k => !filter || k.toLowerCase().includes(filter.toLowerCase())).join('\n');
  const inspectPath = (path) => { if(!path) return "Usage: inspect <object.path>"; try { let v = path.split('.').reduce((o,k)=>o[k], window); return formatReactValue(v, 0, 10); } catch (e) { return e.message; }};
  const executeCode = (code) => { try { return formatReactValue(new Function(`return ${code}`)(), 0, 10); } catch (e) { return e.message; }};

  const processCommand = async (cmd) => {
    const [mainCommand, ...args] = cmd.trim().split(' ');
    let output;
    const commandMap = {
      help: () => `Available commands:\n- help: Show this message.\n- probe: Run sandbox scan.\n- clear: Clear screen.\n- fibertree: Inspect React component tree.\n- globals [filter]: List global properties.\n- inspect <path>: Inspect a JS object.\n- eval <code>: Execute JS code.`,
      clear: () => { setHistory([]); return null; },
      probe: runComprehensiveProbe,
      fibertree: () => advancedFiberTree(appRootRef.current),
      globals: () => getGlobals(args[0]),
      inspect: () => inspectPath(args[0]),
      eval: () => executeCode(args.join(' ')),
    };
    try { const result = await Promise.resolve(commandMap[mainCommand.toLowerCase()]()); if (result !== null) output = result; else return; } catch (e) { output = `Command not found or error: ${mainCommand}`; }
    setHistory(h => [...h, { command: cmd, output }]);
  };

  React.useEffect(() => { terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight); }, [history]);

  return (
    <div className="bg-black text-white font-mono h-[60vh] p-4 flex flex-col rounded-lg">
      <div ref={terminalRef} className="flex-grow overflow-y-auto" onClick={() => document.getElementById('cli-input')?.focus()}>
        {history.map((entry, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center"><span className="text-green-400 mr-2">&gt;</span><span>{entry.command}</span></div>
            <div className="text-gray-300 whitespace-pre-wrap">{entry.output}</div>
          </div>
        ))}
        <div className="flex items-center mt-2">
          <span className="text-green-400 mr-2">&gt;</span>
          <input id="cli-input" type="text" value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); processCommand(command); setCommand(''); } }} className="bg-transparent border-none text-white focus:outline-none w-full" autoFocus autoComplete="off" />
        </div>
      </div>
    </div>
  );
}


// --- Main Introspector Component ---
window.JulesIntrospectorApp = function JulesIntrospector() {
  const [jsCode, setJsCode] = React.useState('');
  const [introspectionResult, setIntrospectionResult] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('introspect');
  const appVersion = "3.0.0";
  const appRootRef = React.useRef(null);

  const handleCodeChange = (event) => { setJsCode(event.target.value); setIntrospectionResult(null); };
  const introspectCode = () => { const functions = [], variables = []; try { if (typeof acorn === 'undefined' || typeof estraverse === 'undefined') throw new Error("AST parsing libraries not available."); const ast = acorn.parse(jsCode, { ecmaVersion: 2020, sourceType: 'module', allowHashBang: true }); estraverse.traverse(ast, { enter: function (node) { if (node.type === 'FunctionDeclaration' && node.id) functions.push(node.id.name); else if (node.type === 'VariableDeclarator' && node.id) { if (node.init && (node.init.type === 'FunctionExpression' || node.init.type === 'ArrowFunctionExpression')) functions.push(node.id.name); else variables.push(node.id.name); } else if (node.type === 'ClassDeclaration' && node.id) functions.push(node.id.name); } }); setIntrospectionResult({ functions, variables }); } catch (error) { setIntrospectionResult({ functions: [], variables: [], error: `Failed to parse: ${error.message}` }); } };
  const copyResultsToClipboard = React.useCallback(() => { if (!introspectionResult) return; const resultsText = JSON.stringify(introspectionResult, null, 2); navigator.clipboard.writeText(resultsText).then(() => alert('Copied!'), () => alert('Failed to copy.')); }, [introspectionResult]);
  const downloadResults = React.useCallback(() => { if (!introspectionResult) return; const filename = `js-introspector-results.json`; const blob = new Blob([JSON.stringify(introspectionResult, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url); }, [introspectionResult]);

  return (
    <div ref={appRootRef} className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex flex-col items-center font-sans text-gray-800">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 text-center drop-shadow-lg">Jules' Comprehensive Introspector</h1>
      <p className="text-sm text-gray-500 mb-8">Version {appVersion}</p>

      <div className="flex border-b border-gray-300 mb-6 justify-center w-full max-w-6xl">
        <button onClick={() => setActiveTab('introspect')} className={`py-3 px-6 text-lg font-medium ${activeTab === 'introspect' ? 'border-b-4 border-blue-500 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>Code Introspector</button>
        <button onClick={() => setActiveTab('os_profile')} className={`py-3 px-6 text-lg font-medium ${activeTab === 'os_profile' ? 'border-b-4 border-blue-500 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>OS Profile</button>
        <button onClick={() => setActiveTab('cli')} className={`py-3 px-6 text-lg font-medium ${activeTab === 'cli' ? 'border-b-4 border-blue-500 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>Interactive CLI</button>
      </div>

      <div className="w-full max-w-6xl">
        {activeTab === 'introspect' && (
          <div className="flex flex-col items-center">
            <textarea className="w-full h-72 p-5 mb-6 text-lg border-2 border-blue-300 rounded-xl shadow-lg font-mono bg-white" placeholder="Paste JavaScript code here..." value={jsCode} onChange={handleCodeChange}></textarea>
            <button onClick={introspectCode} className="font-bold py-3 px-8 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 text-white">Introspect Code</button>
            {introspectionResult && (
              <div className="mt-10 w-full bg-white p-7 rounded-xl shadow-2xl border">
                <h2 className="text-3xl font-bold text-blue-600 mb-6 border-b-2 pb-3">Results</h2>
                {introspectionResult.error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert"><strong className="font-bold">Error:</strong><span className="block sm:inline ml-2">{introspectionResult.error}</span></div>}
                <div className="mb-6"><h3 className="text-2xl font-semibold mb-3">Functions ({introspectionResult.functions.length})</h3>{introspectionResult.functions.length > 0 ? <ul className="list-disc list-inside space-y-1">{introspectionResult.functions.map((func, i) => <li key={i}><code className="bg-green-50 text-green-800 px-2 py-1 rounded-md">{func}</code></li>)}</ul> : <p>None identified.</p>}</div>
                <div><h3 className="text-2xl font-semibold mb-3">Variables ({introspectionResult.variables.length})</h3>{introspectionResult.variables.length > 0 ? <ul className="list-disc list-inside space-y-1">{introspectionResult.variables.map((v, i) => <li key={i}><code className="bg-purple-50 text-purple-800 px-2 py-1 rounded-md">{v}</code></li>)}</ul> : <p>None identified.</p>}</div>
                <div className="mt-8 flex justify-center space-x-4"><button onClick={copyResultsToClipboard} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full">Copy</button><button onClick={downloadResults} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full">Download</button></div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'os_profile' && <OSProfiler />}
        {activeTab === 'cli' && <CLI appRootRef={appRootRef} />}
      </div>
    </div>
  );
}