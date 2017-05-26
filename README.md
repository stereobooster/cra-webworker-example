# Webworkers for CRA

Issue in CRA repo: https://github.com/facebookincubator/create-react-app/issues/1277

This is CRA ejected project in which I prototype webpack configuration for webworker.

Idea: use `*.webworker.js` as convention over configuration.

For example [mapbox-gl-js/src/util/browser/web_worker.js](https://github.com/mapbox/mapbox-gl-js/blob/b9e10b939c6a3fe5d7ecac209f751b4871970ede/src/util/browser/web_worker.js) instead of:

```js
'use strict';

const WebWorkify = require('webworkify');
const window = require('../window');
const workerURL = window.URL.createObjectURL(new WebWorkify(require('../../source/worker'), {bare: true}));

module.exports = function () {
    return new window.Worker(workerURL);
};
```

Will do:
```js
'use strict';

const workerURL = require('../../source/worker.webworker');

module.exports = function () {
    return new window.Worker(workerURL);
};
```

It will be up to bundler (browserify, webpack) to decide what to do. For example:
 - mapbox can decide to continue to use Browserify + Webworkify and generate single file e.g. `require('../../source/worker.webworker');` will be transformed to `window.URL.createObjectURL(new WebWorkify(require('../../source/worker'), {bare: true}));` behind the scene.
 - or in case of [react-map-gl](https://github.com/uber/react-map-gl) + CRA, webpack can be instructed to generate URLs

## TODO

- How to instruct webpack to generate URLs for `require('*.webworker')` in node folder and generate corresponding files to web folder.
- Change ESLint settings to suport `self` keyword in webworkers
