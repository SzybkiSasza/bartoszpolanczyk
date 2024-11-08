import React from 'react';
import styled from 'styled-components';
import { MOBILE_WIDTH_BREAKPOINT } from '../../constants';

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenteredBody = styled.div<{ $maxWidth?: number }>`
  margin: 0 12px;
  max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '800px')};

  @media (max-width: ${MOBILE_WIDTH_BREAKPOINT}) {
    margin: 0 24px;
  }
`;

export const CenteredColumnLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CenteredWrapper>
      <CenteredBody>{children}</CenteredBody>
    </CenteredWrapper>
  );
};
