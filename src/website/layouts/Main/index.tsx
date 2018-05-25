import * as React from 'react';

import './Main.css';

interface MainProps {}
interface MainState {
  headerVisible: boolean;
  shadow: number;
}

// Intervals between actions
const BLINK_ON_INTERVAL = 3000;
const BLINK_OFF_INTERVAL = 1000;

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: any) {
    super(props);

    this.state = {
      headerVisible: true,
      shadow: 0,
    };

    this.blinkingLoop();
  }

  private get className() {
    return `main__header ` +
      `main__header--shadow-${this.state.shadow} ` +
      `${this.state.headerVisible ? '' : 'main__header--dark'}`;
  }

  /**
   * Simulates "Insert Coin" blinking
   */
  private blinkingLoop() {
    setTimeout(
      () => {
        this.setState(
          (prevState: Readonly<MainState>) => ({
            ...prevState,
            headerVisible: !prevState.headerVisible,
          }),
          this.blinkingLoop,
        );
      },
      this.state.headerVisible ? BLINK_ON_INTERVAL : BLINK_OFF_INTERVAL,
    );
  }

  render() {
    return (
      <div className="main">
        <div className="main__tv-overlay"/>
        <div className="main__scanlines"/>
        <div className={this.className}>
          <h1>Bart<span>o</span>sz P<span>o</span>lanczyk</h1>
          <h2>Insert c<span>o</span>in</h2>
        </div>
      </div>
    );
  }
}

