import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from 'website/components/hello';

import './index.scss';

ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById('hello'),
);
