import styled from 'styled-components';
import { colors } from '../theme';

const StyledButton = styled.button`
  background-color: ${colors['lighter brand color']};
  color:  ${colors.background};
  border: none;
  border-radius: 10px;
  width: auto;
  height: auto;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
`;

export default function AddServerButton() {
  return (
    <StyledButton>+</StyledButton>
  )
}
