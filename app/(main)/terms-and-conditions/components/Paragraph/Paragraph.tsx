'use client';

import styled from 'styled-components';
import { MOBILE_WIDTH_BREAKPOINT } from '../../../../constants';

export const Paragraph = styled.p`
  margin-bottom: 12px;
  @media (max-width: ${MOBILE_WIDTH_BREAKPOINT}) {
    margin-bottom: 24px;
  }
`;
