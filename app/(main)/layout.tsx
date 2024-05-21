'use client'

import React, { useEffect, useState } from 'react';
import { getHeaderStyleObject, getNextHeaderStyle, getRandomNumber, getScanlinesStyle } from './migrate-me/Helpers';
import { ElementStyle, MainState } from './migrate-me/interfaces';

const BLINK_ON_INTERVAL = 3000;
const BLINK_OFF_INTERVAL = 1000;

const SHAKING_TIME_MAX = 300;

const STEADY_TIME_MIN = 2000;
const STEADY_TIME_MAX = 20000;

const SHAKING_INTERVAL_MIN = 5;
const SHAKING_INTERVAL_MAX = 30;

const SCANLINE_OPACITY_MIN = 4;
const SCANLINE_OPACITY_MAX = 6;
const SCANLINE_REFRESH_RATE = 40;
const SCANLINE_RANDOMBLINK_PROBABILITY = 0.05;

let shakingTime = -Infinity;

export default function MainLayout({ children }: {
  children: React.ReactNode
}) {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [scanlinesOpacity, setScanlinesOpacity] = useState(SCANLINE_OPACITY_MAX);
  const [headerStyle, setHeaderStyle] = useState<ElementStyle>({});

  useEffect(() => {
      // Blinking loop
      let blinkingLoopId: NodeJS.Timeout;
      const blinkingLoop = () => {
        blinkingLoopId = setTimeout(
          () => {
            setHeaderVisible(
              (headerVisible) => (!headerVisible),
            );
            blinkingLoop();
          },
          headerVisible ? BLINK_ON_INTERVAL : BLINK_OFF_INTERVAL,
        );
      }
      blinkingLoop();

      // Shaking loop
      let shakingLoopId: NodeJS.Timeout;
      const shakingLoop = () => {
        if (shakingTime >= SHAKING_TIME_MAX) {
          setHeaderStyle({  });
          shakingTime = 0;

          const nextShakingTime = getRandomNumber(STEADY_TIME_MIN, STEADY_TIME_MAX);
          setTimeout(
            () => {
              shakingLoop();
            },
            nextShakingTime,
          );
        } else {
          const nextShake = getRandomNumber(SHAKING_INTERVAL_MIN, SHAKING_INTERVAL_MAX);

          const shouldDisplayAligned = Math.random() <= 0.3;
          if (shouldDisplayAligned) {
            setHeaderStyle({});
          } else {
            const nextElementStyle = getNextHeaderStyle();
            setHeaderStyle(nextElementStyle);
          }

          setTimeout(
            () => {
              shakingTime += nextShake;
              shakingLoop();
            },
            nextShake,
          );
        }
      };
      shakingLoop();

      return () => {
        clearTimeout(blinkingLoopId);
        clearTimeout(shakingLoopId);
      };
    }
    ,
    []
  );

  return <div className="main">
    <div className="main__tv-overlay"/>
    <div style={ getScanlinesStyle({
      headerStyle,
      headerVisible,
      scanlinesOpacity
    }) } className="main__scanlines"/>
    <div className="main__header" style={ getHeaderStyleObject({
      headerStyle,
      headerVisible,
      scanlinesOpacity,
    }) } data-depth="0.5">
      <h1>Bartosz Polanczyk</h1>
      <h2 style={ { opacity: headerVisible ? 1 : 0 } }>
        Insert c<span>o</span>in
      </h2>
    </div>
  </div>
}
