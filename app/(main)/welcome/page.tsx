'use client';

import React from 'react';

import { Banner } from '../components/Banner/Banner';
import { TvOverlay } from '../components/TvOverlay/TvOverlay';

const WelcomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TvOverlay />
      <Banner />
    </>
  );
};

export default WelcomePage;
