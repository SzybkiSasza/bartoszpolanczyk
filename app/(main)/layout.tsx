'use client'

import { Press_Start_2P } from 'next/font/google';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import type { ElementStyle } from './helpers';
import { getHeaderStyleObject, getNextHeaderStyle, getRandomNumber, getScanLinesStyle } from './helpers';

import './main-layout.css';

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

const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' })

export default function MainLayout() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [scanLinesOpacity, setScanLinesOpacity] = useState(SCANLINE_OPACITY_MAX);
  const [headerStyle, setHeaderStyle] = useState<ElementStyle>(undefined);
  const [shakingTime, setShakingTime] = useState(0);

  // Timeout IDs
  const blinkingLoopId = useRef<NodeJS.Timeout>();
  const scanLineBlinkingLoopId = useRef<NodeJS.Timeout>();
  const shakingLoopId = useRef<NodeJS.Timeout>();

  // Callbacks for triggering the effects
  const blinkingLoop = useCallback(() => {
    blinkingLoopId.current = setTimeout(() => {
      setHeaderVisible(!headerVisible);
    }, headerVisible ? BLINK_ON_INTERVAL : BLINK_OFF_INTERVAL);
  }, [headerVisible]);
  useEffect(() => {
    blinkingLoop();
    return () => {
      clearTimeout(blinkingLoopId.current);
    }
  }, [blinkingLoop]);

  const scanLineBlinkingLoop = useCallback(() => {
    scanLineBlinkingLoopId.current = setTimeout(() => {
      if (scanLinesOpacity !== SCANLINE_OPACITY_MAX) {
        setScanLinesOpacity(SCANLINE_OPACITY_MAX);
      } else {
        const isRandomBlink = Math.random() <= SCANLINE_RANDOMBLINK_PROBABILITY;
        if (isRandomBlink) {
          const newOpacity = getRandomNumber(0, SCANLINE_OPACITY_MIN);
          setScanLinesOpacity(newOpacity);
        } else {
          setScanLinesOpacity(SCANLINE_OPACITY_MIN);
        }
      }
    }, SCANLINE_REFRESH_RATE);
  }, [scanLinesOpacity]);
  useEffect(() => {
    scanLineBlinkingLoop();
    return () => {
      clearTimeout(scanLineBlinkingLoopId.current);
    }
  }, [scanLineBlinkingLoop]);

  const shakingLoop = useCallback(() => {
    if (shakingTime >= SHAKING_TIME_MAX) {
      setHeaderStyle(undefined);

      const nextShakingTime = getRandomNumber(STEADY_TIME_MIN, STEADY_TIME_MAX);
      setTimeout(() => {
        setShakingTime(0);
      }, nextShakingTime);
    } else {
      const nextShake = getRandomNumber(SHAKING_INTERVAL_MIN, SHAKING_INTERVAL_MAX);

      const shouldDisplayAligned = Math.random() <= 0.3;
      if (shouldDisplayAligned) {
        setHeaderStyle(undefined);
      } else {
        const nextElementStyle = getNextHeaderStyle();
        setHeaderStyle(nextElementStyle);
      }

      shakingLoopId.current = setTimeout(() => {
        setShakingTime(shakingTime + nextShake);
      }, nextShake);
    }
  }, [shakingTime]);
  useEffect(() => {
    shakingLoop();
    return () => {
      clearTimeout(shakingLoopId.current);
    }
  }, [shakingLoop]);

  return <div className={ `main ${ pressStart2P.className }` }>
    <div className="main__tv-overlay"/>
    <div style={ getScanLinesStyle(scanLinesOpacity) } className="main__scanlines"/>
    <div className="main__header" style={ getHeaderStyleObject(headerStyle) } data-depth="0.5">
      <h1>Bartosz Polanczyk</h1>
      <h2 style={ { opacity: headerVisible ? 1 : 0 } }>
        Insert c<span>o</span>in
      </h2>
    </div>
  </div>
}
