import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { MOBILE_WIDTH_BREAKPOINT } from '../../constants';
import { pressStart2P } from '../../fonts';
import { getRandomNumber } from '../../utils/random';
import {
  ElementState,
  getBannerAnimStyle,
  getRandomHeaderState,
} from './animHelpers';

const BLINK_ON_INTERVAL = 3000;
const BLINK_OFF_INTERVAL = 1000;

const SHAKING_TIME_MAX = 300;

const STEADY_TIME_MIN = 2000;
const STEADY_TIME_MAX = 20000;

const SHAKING_INTERVAL_MIN = 5;
const SHAKING_INTERVAL_MAX = 30;

const BannerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const AnimatedBanner = styled.div`
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-shadow: 0 0 30px;
`;

const PrimaryHeader = styled.h1`
  padding: 20px 0 14px 14px;
  border-top: 3px solid #fff;
  border-bottom: 3px solid #fff;
  font-size: 50px;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
  @media (max-width: ${MOBILE_WIDTH_BREAKPOINT}) {
    letter-spacing: 5px;
    font-size: 25px;
    line-height: 30px;
  }
`;

const SecondaryHeader = styled.h2<{ $isVisible: boolean }>`
  padding: 10px 0 6px;
  font-size: 30px;
  line-height: 30px;
  cursor: pointer;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  @media (max-width: ${MOBILE_WIDTH_BREAKPOINT}) {
    letter-spacing: 5px;
    font-size: 15px;
  }
`;

const StyledCoin = styled.span`
  color: gold;
  text-shadow:
    4px 0 0 darkgoldenrod,
    -4px 0 0 darkgoldenrod,
    0 4px 0 darkgoldenrod,
    0 -4px 0 darkgoldenrod;
  @media (max-width: ${MOBILE_WIDTH_BREAKPOINT}) {
    text-shadow:
      2px 0 0 darkgoldenrod,
      -2px 0 0 darkgoldenrod,
      0 2px 0 darkgoldenrod,
      0 -2px 0 darkgoldenrod;
  }
`;

export const Banner: React.FC = () => {
  const [isInsertCoinVisible, setIsInsertCoinVisible] = useState(true);
  const [bannerAnimState, setBannerAnimState] =
    useState<ElementState>(undefined);
  const [shakingTime, setShakingTime] = useState(0);

  // Timeout IDs
  const blinkingLoopId = useRef<NodeJS.Timeout>();
  const shakingLoopId = useRef<NodeJS.Timeout>();

  // Callbacks for triggering the effects
  const blinkingLoop = useCallback(() => {
    blinkingLoopId.current = setTimeout(
      () => {
        setIsInsertCoinVisible(!isInsertCoinVisible);
      },
      isInsertCoinVisible ? BLINK_ON_INTERVAL : BLINK_OFF_INTERVAL,
    );
  }, [isInsertCoinVisible]);
  useEffect(() => {
    blinkingLoop();
    return () => {
      clearTimeout(blinkingLoopId.current);
    };
  }, [blinkingLoop]);

  const shakingLoop = useCallback(() => {
    if (shakingTime >= SHAKING_TIME_MAX) {
      setBannerAnimState(undefined);

      const nextShakingTime = getRandomNumber(STEADY_TIME_MIN, STEADY_TIME_MAX);
      setTimeout(() => {
        setShakingTime(0);
      }, nextShakingTime);
    } else {
      const nextShake = getRandomNumber(
        SHAKING_INTERVAL_MIN,
        SHAKING_INTERVAL_MAX,
      );

      const shouldDisplayAligned = Math.random() <= 0.3;
      if (shouldDisplayAligned) {
        setBannerAnimState(undefined);
      } else {
        const nextBannerState = getRandomHeaderState();
        setBannerAnimState(nextBannerState);
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
    };
  }, [shakingLoop]);

  return (
    <BannerWrapper>
      <AnimatedBanner
        className={pressStart2P.className}
        style={getBannerAnimStyle(bannerAnimState)}
      >
        <PrimaryHeader>Bartosz Polanczyk</PrimaryHeader>
        <SecondaryHeader $isVisible={isInsertCoinVisible}>
          Insert c<StyledCoin>o</StyledCoin>in
        </SecondaryHeader>
      </AnimatedBanner>
    </BannerWrapper>
  );
};
