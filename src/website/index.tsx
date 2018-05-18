import * as React from 'react';
import * as ReactDOM from 'react-dom';

import registerServiceWorker from 'website/registerServiceWorker';

ReactDOM.render(
  <div>Hello There!</div>,
  document.getElementById('root') as HTMLElement,
);

registerServiceWorker();
