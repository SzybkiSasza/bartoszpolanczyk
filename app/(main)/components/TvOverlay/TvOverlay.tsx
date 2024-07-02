import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getRandomNumber } from "../../helpers";

const SCANLINE_OPACITY_MIN = 0.4;
const SCANLINE_OPACITY_MAX = 0.6;
const SCANLINE_REFRESH_RATE = 40;
const SCANLINE_RANDOMBLINK_PROBABILITY = 0.05;

const CorneredLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  box-shadow: 0 0 100px #7a98ff inset;
  filter: blur(50px);
`;

const ScanLines = styled.div<{ opacity: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAHElEQVQoU2NkIBIwMjAw/CdGLUghUYAkhSPPagDdsQMIO1AQDgAAAABJRU5ErkJggg==)
    repeat;
  opacity: ${(props) => props.opacity};
  pointer-events: none;
  box-shadow: 1px 1px 0 white;
`;

export const TvOverlay: React.FC = () => {
  const [scanLinesOpacity, setScanLinesOpacity] =
    useState(SCANLINE_OPACITY_MAX);
  const scanLineBlinkingLoopId = useRef<NodeJS.Timeout>();

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
    };
  }, [scanLineBlinkingLoop]);

  return (
    <>
      <CorneredLayout />
      <ScanLines opacity={scanLinesOpacity} />
    </>
  );
};
