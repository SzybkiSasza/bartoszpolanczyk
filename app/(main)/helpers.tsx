import * as React from 'react';

export interface Transform {
  left: number;
  top: number;
  height?: number;
  width?: number;
  skew?: number;
}

export interface ElementStyle {
  offset?: Transform;
  red?: Transform;
  green?: Transform;
  blue?: Transform;
}

const PIXEL_MAX_OVERSHOOT = 10;
const TITLE_MAX_OVERSHOOT = 30;
const TITLE_MIN_SCALE = 5;

export const getHeaderStyleObject = (headerStyle?: ElementStyle): React.CSSProperties => {
  if (!headerStyle) {
    return {} as React.CSSProperties;
  }

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

export const getScanLinesStyle = (scanLinesOpacity: number) => {
  return {
    opacity: 0.1 * scanLinesOpacity,
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
      left: getRandomNumber(0, TITLE_MAX_OVERSHOOT, true),
      top: getRandomNumber(0, TITLE_MAX_OVERSHOOT, true),
      height: getRandomNumber(TITLE_MIN_SCALE, 10) * 0.1,
      width: getRandomNumber(TITLE_MIN_SCALE, 10) * 0.1,
      skew: getRandomNumber(1, 2),
    },
    red: {
      left: getRandomNumber(0, PIXEL_MAX_OVERSHOOT, true),
      top: getRandomNumber(0, PIXEL_MAX_OVERSHOOT),
    },
    green: {
      left: getRandomNumber(0, PIXEL_MAX_OVERSHOOT, true),
      top: getRandomNumber(0, PIXEL_MAX_OVERSHOOT, true),
    },
    blue: {
      left: getRandomNumber(0, PIXEL_MAX_OVERSHOOT, true),
      top: getRandomNumber(0, PIXEL_MAX_OVERSHOOT, true),
    },
  };
};
