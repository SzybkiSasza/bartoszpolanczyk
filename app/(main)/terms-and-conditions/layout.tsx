'use client';

import React from 'react';
import styled from 'styled-components';
import { CenteredColumnLayout } from '../../layouts/CenteredColumnLayout/CenteredColumnLayout';

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
    <CenteredColumnLayout>
      <TermsAndConditionsHeader>Terms And Conditions</TermsAndConditionsHeader>
      <TermsAndConditionsOutlet>{children}</TermsAndConditionsOutlet>
    </CenteredColumnLayout>
  );
};

export default TermsAndConditionsLayout;
