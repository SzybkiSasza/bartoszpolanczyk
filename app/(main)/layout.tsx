'use client';

import React from 'react';
import styled from 'styled-components';

const MainLayoutContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayoutContainer>{children}</MainLayoutContainer>;
};

export default MainLayout;
