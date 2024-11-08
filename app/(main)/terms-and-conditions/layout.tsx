'use client';

import React from 'react';
import styled from 'styled-components';
import { CenteredLayout } from '../../layouts/CenteredLayout/CenteredLayout';

const TermsAndConditionsHeader = styled.h1`
  text-align: center;
  margin: 32px 0 12px;
`;

const TermsAndConditionsOutlet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

const TermsAndConditionsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CenteredLayout>
      <TermsAndConditionsHeader>Terms And Conditions</TermsAndConditionsHeader>
      <TermsAndConditionsOutlet>{children}</TermsAndConditionsOutlet>
    </CenteredLayout>
  );
};

export default TermsAndConditionsLayout;
