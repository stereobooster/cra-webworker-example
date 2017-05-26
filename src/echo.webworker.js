import { default as exampleModule } from './exampleModule';

self.onmessage = function(e) {
  console.log('[WORKER]', e.data.message);
  exampleModule('test');
  self.postMessage({
    message: 'Message from worker'
  });
};
