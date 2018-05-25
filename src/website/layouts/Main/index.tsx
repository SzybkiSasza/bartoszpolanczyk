import * as React from 'react';

import { ElementStyle, MainProps, MainState } from './interfaces';
import './Main.css';

const BLINK_ON_INTERVAL = 3000;
const BLINK_OFF_INTERVAL = 1000;

const SHAKING_TIME_MAX = 1000;

const STEADY_TIME_MIN = 5000;
const STEADY_TIME_MAX = 30000;

const SHAKING_INTERVAL_MIN = 10;
const SHAKING_INTERVAL_MAX = 50;

const PIXEL_MAX_OVERSHOOT = 10;
const TITLE_MAX_OVERSHOOT = 30;
const TITLE_MIN_SCALE = 5;

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: any) {
    super(props);

    this.state = {
      headerVisible: true,
    };
  }

  componentDidMount() {
    this.blinkingLoop();
    this.shakingLoop();
  }

  // Shake/steady time
  private shakingTime = Infinity;

  private get className() {
    return `main__header ` +
      `${this.state.headerVisible ? '' : 'main__header--dark'}`;
  }

  private get style() {
    if (!this.state.elementStyle) {
      return {} as React.CSSProperties;
    }

    const elementStyle = this.state.elementStyle;
    return {
      transform: `skew(${elementStyle.offset.skew * Math.PI}rad, ` +
        `${elementStyle.offset.skew * Math.PI}rad)` +
        `translate(${elementStyle.offset.top}px, ${elementStyle.offset.left}px) ` +
        `scaleY(${elementStyle.offset.height})`,
      textShadow: `${elementStyle.red.left}px ${elementStyle.red.top}px 0 #ff0300, ` +
        `${elementStyle.blue.left}px ${elementStyle.blue.top}px 0 #0041ff, ` +
        `${elementStyle.green.left}px ${elementStyle.green.top}px 0 #00ff29`,
    } as React.CSSProperties;
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

  private getNextElementStyle(): ElementStyle {
    return {
      offset: {
        left: this.getRandomNumber(0, TITLE_MAX_OVERSHOOT, true),
        top: this.getRandomNumber(0, TITLE_MAX_OVERSHOOT, true),
        height: this.getRandomNumber(TITLE_MIN_SCALE, 10) * 0.1,
        skew: this.getRandomNumber(0, 2),
      },
      red: {
        left: this.getRandomNumber(0, PIXEL_MAX_OVERSHOOT, true),
        top: this.getRandomNumber(0, PIXEL_MAX_OVERSHOOT),
      },
      green: {
        left: this.getRandomNumber(0, PIXEL_MAX_OVERSHOOT, true),
        top: this.getRandomNumber(0, PIXEL_MAX_OVERSHOOT, true),
      },
      blue: {
        left: this.getRandomNumber(0, PIXEL_MAX_OVERSHOOT, true),
        top: this.getRandomNumber(0, PIXEL_MAX_OVERSHOOT, true),
      },
    };
  }

  private getRandomNumber(min: number, max: number, allowNegative = false): number {
    const randNumber = Math.floor((max - min) * Math.random()) + min;
    const sign = Math.sign(Math.cos(Math.random() * Math.PI));

    return allowNegative ? sign * randNumber : randNumber;
  }

  private setPartialState(partial: MainState) {
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
      this.setPartialState({ elementStyle: undefined });
      this.shakingTime = 0;

      const nextShakingTime = this.getRandomNumber(STEADY_TIME_MIN, STEADY_TIME_MAX);
      setTimeout(
        () => {
          this.shakingLoop();
        },
        nextShakingTime,
      );
    } else {
      const nextShake = this.getRandomNumber(SHAKING_INTERVAL_MIN, SHAKING_INTERVAL_MAX);

      const shouldDisplayAligned = Math.random() <= 0.5;
      if (shouldDisplayAligned) {
        this.setPartialState({  });
      } else {
        const nextElementStyle = this.getNextElementStyle();
        this.setPartialState({ elementStyle: nextElementStyle });
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
        <div className={this.className} style={this.style} data-depth="0.5">
          <h1>Bart<span>o</span>sz P<span>o</span>lanczyk</h1>
          <h2>Insert c<span>o</span>in</h2>
        </div>
      </div>
    );
  }
}

