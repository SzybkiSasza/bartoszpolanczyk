'use client';

import styled from 'styled-components';

import { Banner } from './components/Banner/Banner';
import { TvOverlay } from './components/TvOverlay/TvOverlay';

const MainLayoutContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function MainLayout() {
  return (
    <MainLayoutContainer>
      <TvOverlay />
      <Banner />
    </MainLayoutContainer>
  );
}
