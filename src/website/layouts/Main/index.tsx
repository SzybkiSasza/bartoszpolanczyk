import * as React from 'react';

import { Header } from '../../components/Header';

import './Main.css';

export const Main = () => (
  <div className="main">
    <Header/>
    <div className="main__sliding-container">
      <div className="main__part main__part--left"></div>
      <div className="main__part main__part--right"></div>
    </div>
  </div>
);
