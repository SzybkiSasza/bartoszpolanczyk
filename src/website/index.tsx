import * as React from 'react';
import * as ReactDOM from 'react-dom';

import registerServiceWorker from 'website/registerServiceWorker';

import './fonts/fonts.css';
import { Main } from './layouts/Main';

ReactDOM.render(
  <Main/>,
  document.getElementById('root') as HTMLElement,
);

registerServiceWorker();
