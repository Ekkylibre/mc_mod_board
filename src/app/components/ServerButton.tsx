import styled from 'styled-components';
import { colors } from '../theme';

const StyledButton = styled.button`
  background-color: ${colors['background raised']};
  color: white;
  border: 2px solid ${colors['button border']};
  border-radius: 10px;
  width: auto;
  height: 60px;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
`;

interface ServerButtonProps {
  initial: string;
  onClick: () => void;
}

export default function ServerButton({ initial, onClick }: ServerButtonProps) {
  return (
    <StyledButton onClick={onClick}>{initial}</StyledButton>
  );
}
