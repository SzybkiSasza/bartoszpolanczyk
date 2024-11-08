'use client';

import React from 'react';
import styled from 'styled-components';

const MainLayoutContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #cccccc;
  font-family: Arial, Helvetica, sans-serif;
  overflow: auto;
`;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MainLayoutContainer>{children}</MainLayoutContainer>;
};

export default MainLayout;
