import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import {default as echoWorker} from './echo.webworker.js';

const worker = new Worker(echoWorker);
worker.onmessage = function(e) {
  console.log('[MAIN]', e.data.message);
};
worker.postMessage({
  message: 'Message from window'
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
