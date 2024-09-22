import styled from 'styled-components';
import { colors } from '../theme';

interface StyledButtonProps {
  selected: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${colors['background raised']};
  color: white;
  border: 2px solid ${colors['button border']};
  border-radius: 10px;
  width: auto;
  height: 60px;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;

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
