import * as React from 'react';
import { ElementStyle, MainState } from './interfaces';

const PIXEL_MAX_OVERSHOOT = 10;
const TITLE_MAX_OVERSHOOT = 30;
const TITLE_MIN_SCALE = 5;

export const getHeaderStyleObject = (state: MainState): React.CSSProperties => {
  if (!state.headerStyle) {
    return {} as React.CSSProperties;
  }

  const headerStyle = state.headerStyle;
  return {
    transform: `skew(${headerStyle.offset.skew * Math.PI}rad, ` +
    `${headerStyle.offset.skew * Math.PI}rad) ` +
    `translate(${headerStyle.offset.top}px, ${headerStyle.offset.left}px) ` +
    `scaleY(${headerStyle.offset.height}) `,
    textShadow: `${headerStyle.red.left}px ${headerStyle.red.top}px 0 #ff0300, ` +
    `${headerStyle.blue.left}px ${headerStyle.blue.top}px 0 #0041ff, ` +
    `${headerStyle.green.left}px ${headerStyle.green.top}px 0 #00ff29`,
  } as React.CSSProperties;
};

export const getScanlinesStyle = (state: MainState) => {
  return {
    opacity: 0.1 * state.scanlinesOpacity,
  };
};

export const getRandomNumber = (min: number, max: number, allowNegative = false): number => {
  const randNumber = Math.floor((max - min) * Math.random()) + min;
  const sign = Math.sign(Math.cos(Math.random() * Math.PI));

  return allowNegative ? sign * randNumber : randNumber;
};

export const getNextHeaderStyle = (): ElementStyle => {
  return {
    offset: {
      left: this.getRandomNumber(0, TITLE_MAX_OVERSHOOT, true),
      top: this.getRandomNumber(0, TITLE_MAX_OVERSHOOT, true),
      height: this.getRandomNumber(TITLE_MIN_SCALE, 10) * 0.1,
      width: this.getRandomNumber(TITLE_MIN_SCALE, 10) * 0.1,
      skew: this.getRandomNumber(1, 2),
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
};
