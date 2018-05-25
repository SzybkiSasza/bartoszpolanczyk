import * as React from 'react';


import './Main.css';

interface MainProps {}

export class Main extends React.Component<MainProps, any> {
  constructor(props: any) {
    super(props);

    this.shadowState = 0;
  }

  private get className() {
    return `main__header main__header--shadow-${this.shadowState}`;
  }
  private shadowState: number;

  componentDidMount() {

  }

  render() {
    return (
      <div className="main">
        <div className="main__scanlines"></div>
        <h1 className={this.className}>Bartosz Polanczyk</h1>
      </div>
    );
  }
}

