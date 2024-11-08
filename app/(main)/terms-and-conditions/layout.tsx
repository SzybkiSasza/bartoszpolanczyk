'use client';

import React from 'react';
import styled from 'styled-components';

const TermsAndConditionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px 12px;
  max-width: 800px;
`;

const TermsAndConditionsHeader = styled.h1`
  margin: 32px 0;
`;

const TermsAndConditionsOutlet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

const TermsAndConditionsLayout: React.FC = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TermsAndConditionsWrapper>
      <TermsAndConditionsHeader>Terms And Conditions</TermsAndConditionsHeader>
      <TermsAndConditionsOutlet>{children}</TermsAndConditionsOutlet>
    </TermsAndConditionsWrapper>
  );
};

export default TermsAndConditionsLayout;
