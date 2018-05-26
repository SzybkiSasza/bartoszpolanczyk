import * as React from 'react';

import { MainProps, MainState } from './interfaces';
import { getHeaderStyleObject, getRandomNumber, getNextHeaderStyle } from './Helpers';

import './Main.css';

const BLINK_ON_INTERVAL = 3000;
const BLINK_OFF_INTERVAL = 1000;

const SHAKING_TIME_MAX = 300;

const STEADY_TIME_MIN = 2000;
const STEADY_TIME_MAX = 20000;

const SHAKING_INTERVAL_MIN = 5;
const SHAKING_INTERVAL_MAX = 30;

const SCANLINE_MAX_BLINK_INTERVAL = 1000;
const SCANLINE_BLINK_OFF_INTERVAL = 100;

const SCANLINE_OPACITY_MIN = 3;
const SCANLINE_OPACITY_MAX = 8;
const SCANLINE_REFRESH_RATE = 30;

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: any) {
    super(props);

    this.state = {
      headerVisible: true,
      scanlinesOpacity: SCANLINE_OPACITY_MAX,
    };
  }

  componentDidMount() {
    // this.blinkingLoop();
    // this.shakingLoop();
    this.scanlineBlinkingLoop();
  }

  // Shake/steady time
  private shakingTime = Infinity;

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

  private get headerStyle() {
    return getHeaderStyleObject(this.state);
  }

  /**
   * Simulates scanline blinking (regular + random brigtness spikes)
   */
  private scanlineBlinkingLoop() {
    setTimeout(
      () => {}
        // this.setPartialState({})
      ,
      SCANLINE_REFRESH_RATE,
    );
  }

  private setPartialState(partial: Partial<MainState>) {
    this.setState(
      (prevState: Readonly<MainState>) => ({
        ...prevState,
        ...partial,
      }),
    );
  }

  /**
   * Simulates shaking due to unstable electron gun
   */
  private shakingLoop() {
    if (this.shakingTime >= SHAKING_TIME_MAX) {
      this.setPartialState({ headerStyle: undefined });
      this.shakingTime = 0;

      const nextShakingTime = getRandomNumber(STEADY_TIME_MIN, STEADY_TIME_MAX);
      setTimeout(
        () => {
          this.shakingLoop();
        },
        nextShakingTime,
      );
    } else {
      const nextShake = getRandomNumber(SHAKING_INTERVAL_MIN, SHAKING_INTERVAL_MAX);

      const shouldDisplayAligned = Math.random() <= 0.3;
      if (shouldDisplayAligned) {
        this.setPartialState({});
      } else {
        const nextElementStyle = getNextHeaderStyle();
        this.setPartialState({ headerStyle: nextElementStyle });
      }

      setTimeout(
        () => {
          this.shakingTime += nextShake;
          this.shakingLoop();
        },
        nextShake,
      );
    }
  }

  render() {
    return (
      <div className="main">
        <div className="main__tv-overlay"/>
        <div className="main__scanlines"/>
        <div className="main__header" style={this.headerStyle} data-depth="0.5">
          <h1>Bartosz Polanczyk</h1>
          <h2 style={{ opacity: this.state.headerVisible ? 1 : 0 }}>
            Insert c<span>o</span>in
          </h2>
        </div>
      </div>
    );
  }
}

