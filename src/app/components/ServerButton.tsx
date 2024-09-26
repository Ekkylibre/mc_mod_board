import styled, { keyframes } from 'styled-components';
import { colors } from '../theme';

// Définir les keyframes avant de les utiliser
const slideUp = keyframes`
  from {
    transform: translateY(50%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

interface StyledButtonProps {
  selected: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${colors['background raised']};
  color: white;
  border: 2px solid ${colors['button border']};
  border-radius: 10px;
  width: auto;
  height: auto;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  animation: ${slideUp} 0.5s ease-out; // Utilisation des keyframes

  outline: ${({ selected }) =>
    selected ? '2px solid #c1bed1' : 'none'};
`;

interface ServerButtonProps {
  initial: string;
  onClick: () => void;
  selected: boolean;
}

export default function ServerButton({ initial, onClick, selected }: ServerButtonProps) {
  return (
    <StyledButton onClick={onClick} selected={selected}>
      {initial}
    </StyledButton>
  );
}
