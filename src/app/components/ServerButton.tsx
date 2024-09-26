import styled, { keyframes } from 'styled-components';
import { colors } from '../theme';

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
  position: relative; /* Nécessaire pour positionner le "X" */
  animation: ${slideUp} 0.5s ease-out;
  outline: ${({ selected }) =>
    selected ? '2px solid #c1bed1' : 'none'};

  &:hover .close-button {
    display: block; /* Affiche le bouton fermer au hover */
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: -7px;
  right: -7px;
  background-color: ${colors['button border']};
  color: white;
  border: 1px solid ${colors['button border']};
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 13px;
  text-align: center;
  padding: 0;
`;

interface ServerButtonProps {
  initial: string;
  onClick: () => void;
  onClose: () => void;
  selected: boolean;
}

export default function ServerButton({ initial, onClick, onClose, selected }: ServerButtonProps) {
  return (
    <StyledButton onClick={onClick} selected={selected}>
      {initial}
      <CloseButton className="close-button" onClick={onClose}>
        &times;
      </CloseButton>
    </StyledButton>
  );
}
