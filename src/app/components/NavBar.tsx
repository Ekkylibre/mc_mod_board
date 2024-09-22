"use client";
import styled from 'styled-components';
import { colors } from '../theme';

const StyledNavBar = styled.header`
  background-color: ${colors['background raised']};
  padding: 10px;
`;

const StyledTitle = styled.h1`
  color: ${colors['brand color']};
`;

export default function NavBar() {
  return (
    <StyledNavBar>
      <StyledTitle>MC Mod Board</StyledTitle>
    </StyledNavBar>
  );
}
