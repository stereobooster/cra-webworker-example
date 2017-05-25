/* eslint-env worker */
'use strict';

self.onmessage = function(e) {
  console.log('[WORKER]', e.data.message);
  self.postMessage({
    message: 'Message from worker'
  });
};
