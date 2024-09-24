import styled from 'styled-components';
import { colors } from '../theme';

// Définir le type pour les props
type AddServerButtonProps = {
  onClick: () => void; // Fonction sans arguments, qui ne retourne rien
};

const StyledButton = styled.button`
  background-color: ${colors['lighter brand color']};
  color: ${colors.background};
  border: none;
  border-radius: 10px;
  width: auto;
  height: auto;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
`;

const AddServerButton: React.FC<AddServerButtonProps> = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>+</StyledButton>
  );
}

export default AddServerButton;
